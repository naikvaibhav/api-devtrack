const express = require("express");
const router = express.Router();
const watchController = require("./../controllers/watchController");
const appConfig = require("./../../config/appConfig");

//middleware
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/watchers`;

  // defining routes.

  app.post(
    `${baseUrl}`,
    auth.isAuthorized,
    watchController.createWatcherOfIssue
  );

  app.delete(
    `${baseUrl}/remove/:userId`,
    auth.isAuthorized,
    watchController.removeWatcherOfIssue
  );

  app.get(
    `${baseUrl}/:issueid`,
    auth.isAuthorized,
    watchController.getWatchersOfIssue
  );
};
