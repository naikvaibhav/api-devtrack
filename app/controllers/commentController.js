const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("./../libs/timeLib");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const validateInput = require("../libs/paramsValidation");
const check = require("../libs/checkLib");
const tokenLib = require("./../libs/tokenLib");

/* Models */
const CommentModel = mongoose.model("Comment");

// start createIssue function

let createComment = async (req, res) => {
  let newComment = new CommentModel({
    issueId: req.body.issueId,
    comment: req.body.comment,
    commentedBy: req.body.commentedBy,
    commentedOn: time.now(),
  });

  try {
    let savedComment = await newComment.save();
    savedComment = savedComment.toObject();
    let apiResponse = response.generate(
      false,
      "Comment saved",
      201,
      savedComment
    );
    return res.send(apiResponse);
  } catch (err) {
    logger.error(err.message, "commentController:createComment", 10);
    let apiResponse = response.generate(true, err, 500, null);
    return res.send(apiResponse);
  }
};

let getCommentsOfIssue = async (req, res) => {
  try {
    let issueComments = await CommentModel.find({
      issueId: req.params.issueid,
    }).populate("commentedBy");
    if (check.isEmpty(issueComments)) {
      logger.error(
        "No comments found",
        "commentController:getCommentsOfIssue",
        10
      );
      const apiResponse = response.generate(
        true,
        "No comments found in the database",
        400,
        null
      );
      res.send(apiResponse);
    } else {
      const apiResponse = response.generate(
        false,
        "Comment found",
        200,
        issueComments
      );
      res.send(apiResponse);
    }
  } catch (err) {
    console.log(err);
    const apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};

module.exports = {
  createComment: createComment,
  getCommentsOfIssue: getCommentsOfIssue,
};
