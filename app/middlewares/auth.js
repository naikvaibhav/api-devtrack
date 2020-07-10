const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const request = require("request");
const Auth = mongoose.model("Auth");

const logger = require("./../libs/loggerLib");
const response = require("./../libs/responseLib");
const token = require("./../libs/tokenLib");
const check = require("./../libs/checkLib");

let isAuthorized = (req, res, next) => {
  if (
    req.params.authToken ||
    req.query.authToken ||
    req.body.authToken ||
    req.header("authToken")
  ) {
    Auth.findOne(
      {
        authToken:
          req.header("authToken") ||
          req.params.authToken ||
          req.body.authToken ||
          req.query.authToken,
      },
      (err, authDetails) => {
        if (err) {
          logger.error(err.message, "Authorization middleware", 10);
          let apiResponse = response.generate(
            true,
            "Failed to Authorize",
            500,
            null
          );
          res.send(apiResponse);
        } else if (check.isEmpty(authDetails)) {
          logger.error(
            "No Authorization key is present",
            "Authorization middleware",
            10
          );
          let apiResponse = response.generate(
            true,
            "Invalid or Expired AuthorizationKey",
            404,
            null
          );
          res.send(apiResponse);
        } else {
          token.verifyClaim(
            authDetails.authToken,
            authDetails.tokenSecret,
            (err, decoded) => {
              if (err) {
                logger.error(err.message, "Authorization middleware", 10);
                let apiResponse = response.generate(
                  true,
                  "Failed to Authorize",
                  500,
                  null
                );
                res.send(apiResponse);
              } else {
                req.user = { userId: decoded.data.userId };
                next();
              }
            }
          ); //end verifyClaim
        }
      }
    );
  } else {
    logger.error("AuthorizationToken Missing", "AuthorizationMiddleware", 5);
    let apiResponse = response.generate(
      true,
      "AuthorizationToken is missing in request",
      400,
      null
    );
    res.send(apiResponse);
  }
}; //end isAuthorized

module.exports = {
  isAuthorized: isAuthorized,
};
