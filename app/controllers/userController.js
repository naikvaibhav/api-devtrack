const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("./../libs/timeLib");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const validateInput = require("../libs/paramsValidation");
const check = require("../libs/checkLib");
const passwordLib = require("../libs/passwordLib");
const tokenLib = require("./../libs/tokenLib");
const email = require("./../libs/emailLib");

const googleAuthLib = require("../libs/google-auth-validation");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

/* Models */
const UserModel = mongoose.model("User");
const AuthModel = mongoose.model("Auth");

// start user signup function
let signUpFunction = async (req, res) => {
  //validate user signup data
  const error = validateInput.signupValidation(req.body);
  if (error) {
    return res.send(error);
  }
  //check if user already exists
  const emailExists = await UserModel.findOne({
    email: req.body.email.toLowerCase(),
  });
  if (emailExists) {
    let apiResponse = response.generate(
      true,
      "Account cannot be created as email is already registered",
      403,
      null
    );
    return res.send(apiResponse);
  }
  if (!req.body.avatar) {
    //   req.body.avatar =
    //     "https://project-images-upload.s3.amazonaws.com/default-avatar.jpg";
    // } else {
    req.body.avatar = req.body.avatar;
  }
  // email is not registered hence save the new user to database
  let newUser = new UserModel({
    userId: shortid.generate(),
    firstName: req.body.firstName,
    lastName: req.body.lastName || "",
    password: passwordLib.hashPassword(req.body.password),
    email: req.body.email.toLowerCase(),
    avatar: req.body.avatar,
    createdOn: time.now(),
  });
  try {
    let savedUser = await newUser.save();
    savedUser = savedUser.toObject();
    delete savedUser.password;
    let apiResponse = response.generate(
      false,
      "User registered successfully",
      201,
      savedUser
    );
    return res.send(apiResponse);
  } catch (err) {
    logger.error(err.message, "userController:signUpFunction", 10);
    let apiResponse = response.generate(true, err.message, 500, null);
    return res.send(apiResponse);
  }
};

let loginFunction = async (req, res) => {
  //validate user
  const error = validateInput.loginValidation(req.body);
  if (error) {
    return res.send(error);
  }
  //check if user exists
  let user = await UserModel.findOne({ email: req.body.email });
  if (check.isEmpty(user)) {
    logger.error(
      "No user found",
      "userController: loginFunction-check if user exists",
      7
    );
    let apiResponse = response.generate(
      true,
      "Unregistered email address",
      400,
      null
    );
    return res.send(apiResponse);
  }
  //compare and check the password
  const verifiedPassword = await passwordLib.comparePassword(
    req.body.password,
    user.password
  );
  if (!verifiedPassword) {
    let apiResponse = response.generate(
      true,
      "Wrong password, Login failed",
      400,
      null
    );
    return res.send(apiResponse);
  } else if (typeof verifiedPassword == "string") {
    let apiResponse = response.generate(
      true,
      "Password comparison error",
      500,
      null
    );
    return res.send(apiResponse);
  }
  user = user.toObject();
  delete user.password;
  delete user.createdOn;
  delete user.__v;
  //generate token if password is verified
  let token = "";
  tokenLib.generateToken(user, (err, tokenDetails) => {
    if (err) {
      logger.error(err.message, "userController:generateToken", 10);
      let apiResponse = response.generate(
        true,
        "Failed to generate the token",
        500,
        null
      );
      reject(apiResponse);
    } else {
      (tokenDetails.userId = user.userId), (tokenDetails.userDetails = user);
      token = tokenDetails;
    }
  });

  //save the token
  let authTokenPresent = await AuthModel.findOne({ userId: token.userId });
  if (check.isEmpty(authTokenPresent)) {
    let newAuthToken = new AuthModel({
      userId: token.userId,
      authToken: token.token,
      tokenSecret: token.tokenSecret,
      tokenGenerationTime: time.now(),
    });
    try {
      let savedToken = await newAuthToken.save();
      let responseBody = {
        authToken: savedToken.authToken,
        userDetails: token.userDetails,
      };
      let apiResponse = response.generate(
        false,
        "Login successful",
        200,
        responseBody
      );
      return res.send(apiResponse);
    } catch (err) {
      logger.error(err.message, "userController:loginFunction-saveToken", 10);
      let apiResponse = response.generate(true, err.message, 500, null);
      return res.send(apiResponse);
    }
  } else {
    (authTokenPresent.authToken = token.token),
      (authTokenPresent.tokenSecret = token.tokenSecret),
      (authTokenPresent.tokenGenerationTime = time.now());
    try {
      let savedToken = await authTokenPresent.save();
      let responseBody = {
        authToken: savedToken.authToken,
        userDetails: token.userDetails,
      };
      let apiResponse = response.generate(
        false,
        "Login successful",
        200,
        responseBody
      );
      return res.send(apiResponse);
    } catch (err) {
      console.log(err);
      let apiResponse = response.generate(true, err.message, 500, null);
      return res.send(apiResponse);
    }
  }
};

let verifySocialIdToken = async (req, res) => {
  let verifiedInfoOfGoogleUser = "";
  try {
    const googleAuth = await googleAuthLib.getGoogleUser(req.body.idToken);
    if (check.isEmpty(googleAuth)) {
      logger.error(
        "Verification failed",
        "userController: verifySocialIdToken",
        7
      );
      let apiResponse = response.generate(
        true,
        "Google verification failed",
        400,
        null
      );
      return res.send(apiResponse);
    }

    if (googleAuth.email_verified) {
      this.verifiedInfoOfGoogleUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        avatar: req.body.photoUrl,
        email: req.body.email,
        password:
          "Since this account is created using Google signin password is not available",
        socialProvider: req.body.provider,
      };

      let user = await UserModel.findOne({
        email: this.verifiedInfoOfGoogleUser.email,
      }).catch((err) => console.log(err));
      if (check.isEmpty(user)) {
        console.log("Not a registered email");
        let newUser = new UserModel({
          userId: shortid.generate(),
          firstName: this.verifiedInfoOfGoogleUser.firstName,
          lastName: this.verifiedInfoOfGoogleUser.lastName || "",
          password: this.verifiedInfoOfGoogleUser.password,
          email: this.verifiedInfoOfGoogleUser.email.toLowerCase(),
          avatar: (this.verifiedInfoOfGoogleUser.avatar =
            typeof this.verifiedInfoOfGoogleUser.avatar == "undefined"
              ? "https://project-images-upload.s3.amazonaws.com/default-avatar.jpg"
              : this.verifiedInfoOfGoogleUser.avatar),
          provider: this.verifiedInfoOfGoogleUser.socialProvider,
          createdOn: time.now(),
        });
        try {
          let savedUser = await newUser.save();
          savedUser = savedUser.toObject();
          delete savedUser.password;
          let apiResponse = response.generate(
            false,
            "User registered successfully",
            201,
            savedUser
          );
          // return res.send(apiResponse);

          let user = savedUser;
          delete user.password;
          delete user.createdOn;
          delete user.__v;
          //generate token if password is verified
          let token = "";
          tokenLib.generateToken(user, (err, tokenDetails) => {
            if (err) {
              logger.error(err.message, "userController:generateToken", 10);
              let apiResponse = response.generate(
                true,
                "Failed to generate the token",
                500,
                null
              );
              reject(apiResponse);
            } else {
              (tokenDetails.userId = user.userId),
                (tokenDetails.userDetails = user);
              token = tokenDetails;
            }
          });

          //save the token
          let authTokenPresent = await AuthModel.findOne({
            userId: token.userId,
          });
          if (check.isEmpty(authTokenPresent)) {
            let newAuthToken = new AuthModel({
              userId: token.userId,
              authToken: token.token,
              tokenSecret: token.tokenSecret,
              tokenGenerationTime: time.now(),
            });
            try {
              let savedToken = await newAuthToken.save();
              let responseBody = {
                authToken: savedToken.authToken,
                userDetails: token.userDetails,
              };
              let apiResponse = response.generate(
                false,
                "Login successful",
                200,
                responseBody
              );
              return res.send(apiResponse);
            } catch (err) {
              logger.error(
                err.message,
                "userController:loginFunction-saveToken",
                10
              );
              let apiResponse = response.generate(true, err.message, 500, null);
              return res.send(apiResponse);
            }
          } else {
            (authTokenPresent.authToken = token.token),
              (authTokenPresent.tokenSecret = token.tokenSecret),
              (authTokenPresent.tokenGenerationTime = time.now());
            try {
              let savedToken = await authTokenPresent.save();
              let responseBody = {
                authToken: savedToken.authToken,
                userDetails: token.userDetails,
              };
              let apiResponse = response.generate(
                false,
                "Login successful",
                200,
                responseBody
              );
              return res.send(apiResponse);
            } catch (err) {
              console.log(err);
              let apiResponse = response.generate(true, err.message, 500, null);
              return res.send(apiResponse);
            }
          }
        } catch (err) {
          logger.error(err.message, "userController:signUpFunction", 10);
          let apiResponse = response.generate(true, err.message, 500, null);
          return res.send(apiResponse);
        }
      } else {
        user = user.toObject();
        delete user.password;
        delete user.createdOn;
        delete user.__v;
        //generate token if password is verified
        let token = "";
        tokenLib.generateToken(user, (err, tokenDetails) => {
          if (err) {
            logger.error(err.message, "userController:generateToken", 10);
            let apiResponse = response.generate(
              true,
              "Failed to generate the token",
              500,
              null
            );
            reject(apiResponse);
          } else {
            (tokenDetails.userId = user.userId),
              (tokenDetails.userDetails = user);
            token = tokenDetails;
          }
        });

        //save the token
        let authTokenPresent = await AuthModel.findOne({
          userId: token.userId,
        });
        if (check.isEmpty(authTokenPresent)) {
          let newAuthToken = new AuthModel({
            userId: token.userId,
            authToken: token.token,
            tokenSecret: token.tokenSecret,
            tokenGenerationTime: time.now(),
          });
          try {
            let savedToken = await newAuthToken.save();
            let responseBody = {
              authToken: savedToken.authToken,
              userDetails: token.userDetails,
            };
            let apiResponse = response.generate(
              false,
              "Login successful",
              200,
              responseBody
            );
            return res.send(apiResponse);
          } catch (err) {
            logger.error(
              err.message,
              "userController:loginFunction-saveToken",
              10
            );
            let apiResponse = response.generate(true, err.message, 500, null);
            return res.send(apiResponse);
          }
        } else {
          (authTokenPresent.authToken = token.token),
            (authTokenPresent.tokenSecret = token.tokenSecret),
            (authTokenPresent.tokenGenerationTime = time.now());
          try {
            let savedToken = await authTokenPresent.save();
            let responseBody = {
              authToken: savedToken.authToken,
              userDetails: token.userDetails,
            };
            let apiResponse = response.generate(
              false,
              "Login successful",
              200,
              responseBody
            );
            return res.send(apiResponse);
          } catch (err) {
            console.log(err);
            let apiResponse = response.generate(true, err.message, 500, null);
            return res.send(apiResponse);
          }
        }
      }
    }
  } catch (err) {
    // console.log(err);
    logger.error(err.message, "userController:verifySocialIdToken", 5);
    let apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};

let getSingleUser = async (req, res) => {
  try {
    let singleUser = await UserModel.findOne({ userId: req.params.userid });
    if (check.isEmpty(singleUser)) {
      const apiResponse = response.generate(
        false,
        "No user details",
        400,
        null
      );
      res.send(apiResponse);
    } else {
      const apiResponse = response.generate(
        false,
        "User details found",
        200,
        singleUser
      );
      res.send(apiResponse);
    }
  } catch (err) {
    logger.error(err.message, "userController:getSingleUser", 10);
    let apiResponse = response.generate(true, err, 500, null);
    return res.send(apiResponse);
  }
}; //end getSingleUser function

let getAllUsers = async (req, res) => {
  try {
    let allUsers = await UserModel.find();
    if (check.isEmpty(allUsers)) {
      const apiResponse = response.generate(
        false,
        "No user details",
        400,
        null
      );
      res.send(apiResponse);
    } else {
      const apiResponse = response.generate(
        false,
        "User details found",
        200,
        allUsers
      );
      res.send(apiResponse);
    }
  } catch (err) {
    logger.error(err.message, "userController:getAllUsers", 10);
    let apiResponse = response.generate(true, err, 500, null);
    return res.send(apiResponse);
  }
}; //end getAllUsers function

let logout = (req, res) => {
  AuthModel.deleteOne({ userId: req.body.userId }, (err, result) => {
    if (err) {
      logger.error(err.message, "userController: logout", 10);
      let apiResponse = response.generate(
        true,
        `error ocuured: ${err.message}`,
        500,
        null
      );
      res.send(apiResponse);
    } else if (check.isEmpty(result)) {
      let apiResponse = response.generate(
        true,
        "Already logged out or invalid user",
        404,
        null
      );
      res.send(apiResponse);
    } else {
      if (result.n == 1) {
        let apiResponse = response.generate(
          false,
          "Logged out successfully",
          200,
          result
        );
        res.send(apiResponse);
      } else {
        let apiResponse = response.generate(
          true,
          "Already logged out or invalid user",
          404,
          null
        );
        res.send(apiResponse);
      }
    }
  });
}; // end of the logout function.

let forgotPassword = (req, res) => {
  UserModel.findOne({ email: req.body.email }).exec((err, result) => {
    if (err) {
      logger.error(err.message, "userController:resetPassword()", 10);
      let apiResponse = response.generate(
        true,
        "Failed to Find User",
        500,
        null
      );
      res.send(apiResponse);
    } else if (check.isEmpty(result)) {
      logger.error("No user found", "userController:resetPassword()", 7);
      let apiResponse = response.generate(
        true,
        "No user with this email is registered",
        400,
        null
      );
      res.send(apiResponse);
    } else if (result.provider === "GOOGLE") {
      logger.info(
        "The account is created using google signin",
        "userController:resetPassword()",
        7
      );
      let apiResponse = response.generate(
        false,
        "The account was created using Google signin so cannot reset the password",
        400,
        null
      );
      res.send(apiResponse);
    } else {
      logger.info("User Found", "userController:resetPassword()", 10);
      var payload = {
        userId: result.userId, // User ID from database
        email: result.email,
      };
      secret = result.password + "-" + result.createdOn.getTime();
      const token = jwt.sign(payload, secret, { expiresIn: "30m" });
      let link = `http://localhost:4200/resetPassword/${payload.userId}/${token}`;

      email.emailOnResetPassword(payload.email, link);
      let apiResponse = response.generate(
        false,
        "Mail has been sent",
        200,
        null
      );
      res.send(apiResponse);
    }
  });
}; //end of forgotPassword function

let resetPassword = (req, res) => {
  UserModel.findOne({ userId: req.params.id }).exec((err, result) => {
    if (err) {
      console.log(err);
    } else {
      secret = result.password + "-" + result.createdOn.getTime();
      var payload = "";
      tokenLib.verifyClaim(req.params.token, secret, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.send("Link expired");
        } else {
          return (payload = decoded);
        }
      });
      if (payload) {
        let data = {
          userId: payload.userId,
          token: req.params.token,
        };
        let apiResponse = response.generate(
          false,
          "Token is verified",
          200,
          data
        );
        res.send(apiResponse);
      }
    }
  });
}; //end of resetPassword function

let updatePassword = (req, res) => {
  UserModel.findOne({ userId: req.body.userId }).exec((err, result) => {
    if (err) {
      logger.error(err.message, "userController:updatePassword()", 10);
      let apiResponse = response.generate(
        true,
        "Failed to Find User",
        500,
        null
      );
      res.send(apiResponse);
    } else if (check.isEmpty(result)) {
      logger.error("No user found", "userController:updatePassword()", 7);
      let apiResponse = response.generate(
        true,
        "No user with this id is registered",
        400,
        null
      );
      res.send(apiResponse);
    } else {
      let secret = result.password + "-" + result.createdOn.getTime();
      tokenLib.verifyClaim(req.body.token, secret, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.send("Password Link expired");
        } else {
          if (decoded.userId == req.body.userId) {
            console.log("jwt verified");
            let password = passwordLib.hashPassword(req.body.password);
            // res.send('Your password has been successfully changed');
            UserModel.updateOne(
              { userId: req.body.userId },
              { password: password },
              {
                multi: true,
              }
            ).exec((err, result) => {
              if (err) {
                logger.error(
                  err.message,
                  "userController:updatePassword()",
                  10
                );
                let apiResponse = response.generate(
                  true,
                  "Failed to edit password",
                  500
                );
                res.send(apiResponse);
              } else {
                logger.info(
                  "Password updated",
                  "userController:updatePassword()",
                  10
                );
                let apiResponse = response.generate(
                  false,
                  "Your password has been successfully changed",
                  200,
                  null
                );
                res.send(apiResponse);
              }
            });
          } else {
            console.log("verification failed");
          }
        }
      });
    }
  });
}; //end of updatePassword function

module.exports = {
  signUpFunction: signUpFunction,
  loginFunction: loginFunction,
  verifySocialIdToken: verifySocialIdToken,
  getSingleUser: getSingleUser,
  getAllUsers: getAllUsers,
  logout: logout,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  updatePassword: updatePassword,
};
