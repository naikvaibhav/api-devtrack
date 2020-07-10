const express = require("express");
const router = express.Router();
const commentController = require("./../controllers/commentController");
const appConfig = require("./../../config/appConfig");

//middleware
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/comments`;

  // defining routes.

  app.post(`${baseUrl}`, auth.isAuthorized, commentController.createComment);
  app.get(
    `${baseUrl}/:issueid`,
    auth.isAuthorized,
    commentController.getCommentsOfIssue
  );
};
