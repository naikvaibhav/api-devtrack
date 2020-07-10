const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("./../libs/timeLib");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const validateInput = require("../libs/paramsValidation");
const check = require("../libs/checkLib");
const tokenLib = require("./../libs/tokenLib");

/* Models */
const UserModel = mongoose.model("User");
const IssueModel = mongoose.model("Issue");

// start createIssue function

let createIssue = async (req, res) => {
  let newIssue = new IssueModel({
    issueId: shortid.generate(),
    issueName: req.body.issueName,
    issueDescription: req.body.issueDescription,
    assignee: req.body.assignee,
    reporter: req.body.reporter,
    attachments: req.body.attachments,
    issueReportedOn: time.now(),
  });

  try {
    let savedIssue = await newIssue.save();
    savedIssue = savedIssue.toObject();
    let apiResponse = response.generate(
      false,
      "Issue registered successfully",
      201,
      savedIssue
    );
    return res.send(apiResponse);
  } catch (err) {
    logger.error(err.message, "issueController:createIssue", 10);
    let apiResponse = response.generate(true, err, 500, null);
    return res.send(apiResponse);
  }
};

let editIssue = async (req, res) => {
  let options = req.body;

  try {
    let editIssue = await IssueModel.updateOne(
      { issueId: req.params.issueid },
      options,
      {
        multi: true,
      }
    );
    if (check.isEmpty(editIssue)) {
      let apiResponse = response.generate(true, "Failed to update issue", 500);
      return res.send(apiResponse);
    } else {
      let apiResponse = response.generate(
        false,
        "Issue is updated",
        200,
        editIssue
      );
      res.send(apiResponse);
    }
  } catch (err) {
    logger.error(err.message, "issueController:editIssue", 10);
    let apiResponse = response.generate(true, err, 500, null);
    return res.send(apiResponse);
  }
};

let getAllIssues = async (req, res) => {
  try {
    let allIssues = await IssueModel.find().populate(
      "reporter",
      "userId avatar firstName lastName"
    );
    const apiResponse = response.generate(false, "All issues", 200, allIssues);
    res.send(apiResponse);
  } catch (err) {
    logger.error(err.message, "issueController:getAllIssues", 10);
    let apiResponse = response.generate(true, err, 500, null);
    return res.send(apiResponse);
  }
};

let getAssignedIssuedToMe = async (req, res) => {
  try {
    let assignedIssues = await IssueModel.find({
      assignee: req.params.assigneedId,
    }).populate("reporter", "userId firstName lastName avatar");
    if (check.isEmpty(assignedIssues)) {
      const apiResponse = response.generate(
        false,
        "No assigneed issues",
        400,
        null
      );
      res.send(apiResponse);
    } else {
      const apiResponse = response.generate(
        false,
        "All assigned issues",
        200,
        assignedIssues
      );
      res.send(apiResponse);
    }
  } catch (err) {
    logger.error(err.message, "issueController:getAssignedIssuedToMe", 10);
    let apiResponse = response.generate(true, err, 500, null);
    return res.send(apiResponse);
  }
};

let getCounts = async (req, res) => {
  let count = {};
  await IssueModel.find({ assignee: req.params.assigneedId }).countDocuments(
    { status: "inprogress" },
    function (err, c) {
      count["inprogress"] = c;
    }
  );
  await IssueModel.find({ assignee: req.params.assigneedId }).countDocuments(
    { status: "todo" },
    function (err, c) {
      count["todo"] = c;
    }
  );

  await IssueModel.find({ assignee: req.params.assigneedId }).countDocuments(
    { status: "completed" },
    function (err, c) {
      count["completed"] = c;
    }
  );
  let totalIssues = await IssueModel.find({
    assignee: req.params.assigneedId,
  }).count();
  count["totalIssues"] = totalIssues;
  const apiResponse = response.generate(false, "Count", 200, count);
  res.send(apiResponse);
};

let getSingleIssue = async (req, res) => {
  try {
    let singleIssue = await IssueModel.findOne({
      issueId: req.params.issueid,
    })
      .populate("assignee", "userId firstName lastName avatar")
      .populate("reporter", "userId firstName lastName avatar");
    if (check.isEmpty(singleIssue)) {
      logger.error("No users found", "userController:getSingleIssue", 10);
      const apiResponse = response.generate(
        true,
        "No issue found in the database",
        400,
        null
      );
      res.send(apiResponse);
    } else {
      const apiResponse = response.generate(
        false,
        "Issue found",
        200,
        singleIssue
      );
      res.send(apiResponse);
    }
  } catch (err) {
    console.log(err);
    const apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};

let uploadImage = (req, res) => {
  /* This will be the response sent from the backend to the frontend */
  res.send({ image: req.file });
}; //end of uploadImage function

let deleteImage = (req, res) => {
  let apiResponse = response.generate(false, "File deleted", 200, req.file);
  res.send(apiResponse);
};

let searchIssue = async (req, res) => {
  try {
    const issues = await IssueModel.find({
      $text: { $search: req.query.searchTerm },
    })
      .select("-__v")
      .populate("reporter", "userId firstName lastName avatar");

    if (check.isEmpty(issues)) {
      logger.error("No issues found", "issueController:searchIssue", 10);
      const apiResponse = response.generate(
        true,
        "No issue found in the database",
        400,
        issues
      );
      res.send(apiResponse);
    } else {
      let apiResponse = response.generate(
        false,
        "All issues fetched",
        200,
        issues
      );
      res.send(apiResponse);
    }
  } catch (err) {
    console.log(err);
    let apiResponse = response.generate(true, err.message, 500, null);
    res.send(apiResponse);
  }
};
module.exports = {
  createIssue: createIssue,
  editIssue: editIssue,
  getAllIssues: getAllIssues,
  getAssignedIssuedToMe: getAssignedIssuedToMe,
  uploadImage: uploadImage,
  deleteImage: deleteImage,
  getSingleIssue: getSingleIssue,
  getCounts: getCounts,
  searchIssue: searchIssue,
};
