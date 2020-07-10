const express = require("express");
const router = express.Router();
const userController = require("./../controllers/userController");
const appConfig = require("./../../config/appConfig");
const upload = require("../middlewares/file-upload");

//middleware
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/users`;

  // defining routes
  // params: firstName, lastName, email, password
  app.post(`${baseUrl}/signup`, userController.signUpFunction);
  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/signup api for user local(without using socila login)signup.
     *
     * @apiParam {string} firstName firstName of the user. (body params) (required)
     * @apiParam {string} lastName lastName of the user. (body params) (required)
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required) 
     * @apiParam {string} avatar uploaded profile pic of the user. (body params)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User registered successfully",
            "status": 201,
            "data": {
                "userId": "pSFxj8gyL",
                "firstName": "Vinayak",
                "lastName": "Naik",
                "email": "vinayaknaik1965@gmail.com",
                "userRole": "normal",
                "provider": "local",
                "createdOn": "2020-07-09T11:25:09.000Z",
                "avatar": "https://project-images-upload.s3.amazonaws.com/default-avatar.jpg",
                "_id": "5f06fe950f935e37b0ef6d08",
                "__v": 0
            }

        }
    */

  // params: email, password.
  app.post(`${baseUrl}/login`, userController.loginFunction);
  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/login api for user local(without using social login)login.
     *
     * @apiParam {string} email email of the user. (body params) (required)
     * @apiParam {string} password password of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Login successful",
            "status": 200,
            "data": {
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Ilo5c2p0bGhBayIsImlhdCI6MTU5NDI5NDI2NjY1MiwiZXhwIjoxNTk0MzgwNjY2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJ2YWliaGF2IiwiZGF0YSI6eyJ1c2VySWQiOiJwU0Z4ajhneUwiLCJmaXJzdE5hbWUiOiJWaW5heWFrIiwibGFzdE5hbWUiOiJOYWlrIiwiZW1haWwiOiJ2aW5heWFrbmFpazE5NjVAZ21haWwuY29tIiwidXNlclJvbGUiOiJub3JtYWwiLCJwcm92aWRlciI6ImxvY2FsIiwiYXZhdGFyIjoiaHR0cHM6Ly9wcm9qZWN0LWltYWdlcy11cGxvYWQuczMuYW1hem9uYXdzLmNvbS9kZWZhdWx0LWF2YXRhci5qcGciLCJfaWQiOiI1ZjA2ZmU5NTBmOTM1ZTM3YjBlZjZkMDgifX0.cUqD9N_KakjpbhM4Umbsb6QTCMpFwmH4_lg-70Rvpk4",
                "userDetails": {
                            "userId": "pSFxj8gyL",
                            "firstName": "Vinayak",
                            "lastName": "Naik",
                            "email": "vinayaknaik1965@gmail.com",
                            "userRole": "normal",
                            "provider": "local",
                            "avatar": "https://project-images-upload.s3.amazonaws.com/default-avatar.jpg",
                            "_id": "5f06fe950f935e37b0ef6d08"
                 }
              }

        }
    */

  // auth token params: userId.
  app.post(`${baseUrl}/logout`, userController.logout);
  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/logout api for logout.
     *
     * @apiParam {string} userId userId of the user. (body params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Logged out successfully",
            "status": 200,
            "data": {
                "n": 1,
                "opTime": {
                    "ts": "6847532244811120641",
                    "t": 45
                  },
                "electionId": "7fffffff000000000000002d",
                "ok": 1,
                "$clusterTime": {
                      "clusterTime": "6847532244811120641",
                      "signature": {
                            "hash": "p7bpT3DGivrmy0K1ykmzoh9fcCE=",
                            "keyId": "6805805048392581121"
                      }
                  },
                "operationTime": "6847532244811120641",
                "deletedCount": 1
              }

        }
    */

  app.post(`${baseUrl}/socialId`, userController.verifySocialIdToken);

  // params: userid.
  app.get(
    `${baseUrl}/:userid`,
    auth.isAuthorized,
    userController.getSingleUser
  );
  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {get} /api/v1/users/:userid api for getting logged in user details.
     * @apiHeader {String} authToken Users unique access-key.
     *
     * @apiParam {string} userid userid of the user. (route params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "User details found",
            "status": 200,
            "data": {
                "userId": "pSFxj8gyL",
                "firstName": "Vinayak",
                "lastName": "Naik",
                "email": "vinayaknaik1965@gmail.com",
                "password": "$2b$10$0LGj6fjY.lzEHgRihr8Ueut2RwoIgvjndi4KWg6Dsucu5wMaNcsyu",
                "userRole": "normal",
                "provider": "local",
                "createdOn": "2020-07-09T11:25:09.000Z",
                "avatar": "https://project-images-upload.s3.amazonaws.com/default-avatar.jpg",
                "_id": "5f06fe950f935e37b0ef6d08",
                "__v": 0
              }

        }
    */

  // params: email.
  app.post(`${baseUrl}/forgotPassword`, userController.forgotPassword);
  /**
     * @apiGroup users
     * @apiVersion  1.0.0
     * @api {post} /api/v1/users/forgotPassword api for requesting forgot password action.
     *
     * @apiParam {string} email registered email id of the user. (route params) (required)
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Mail has been sent",
            "status": 200,
            "data": null
        }
    */

  app.get(`${baseUrl}/resetPassword/:id/:token`, userController.resetPassword);

  app.post(`${baseUrl}/updatePassword`, userController.updatePassword);

  // params:userId
  app.get(`${baseUrl}`, auth.isAuthorized, userController.getAllUsers);
};
