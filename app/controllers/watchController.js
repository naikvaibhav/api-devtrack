const mongoose = require("mongoose");
const shortid = require("shortid");
const time = require("./../libs/timeLib");
const response = require("./../libs/responseLib");
const logger = require("./../libs/loggerLib");
const validateInput = require("../libs/paramsValidation");
const check = require("../libs/checkLib");
const tokenLib = require("./../libs/tokenLib");

/* Models */
const WatcherModel = mongoose.model("Watcher");
const IssueModel = mongoose.model("Issue");

// start createIssue function

let createWatcherOfIssue = async (req, res) => {
  //check if watcher already exists
  const watcherExists = await WatcherModel.findOne({
    issueId: req.body.issueId,
    watcher: req.body.watcher,
  });
  if (watcherExists) {
    let apiResponse = response.generate(
      true,
      "Watcher is already present in the watcher list for this issue",
      403,
      null
    );
    return res.send(apiResponse);
  }
  let newWatcher = new WatcherModel({
    issueId: req.body.issueId,
    watcher: req.body.watcher,
    userId: req.body.userId,
    createdOn: time.now(),
  });

  try {
    let savedWatcher = await newWatcher.save();
    savedWatcher = savedWatcher.toObject();
    let apiResponse = response.generate(
      false,
      "Watcher saved",
      201,
      savedWatcher
    );
    let options = {
      watchers: {
        userId: req.body.userId,
        watcher_id: savedWatcher._id,
      },
    };
    await IssueModel.updateOne({ issueId: req.body.issueId }, options, {
      multi: true,
    });
    return res.send(apiResponse);
  } catch (err) {
    logger.error(err.message, "watcherController:createWatcherOfIssue", 10);
    let apiResponse = response.generate(true, err, 500, null);
    return res.send(apiResponse);
  }
};

let removeWatcherOfIssue = async (req, res) => {
  // check if watcher already exists
  const watcherExists = await WatcherModel.findOne({
    userId: req.params.userId,
  });
  if (watcherExists) {
    await WatcherModel.deleteOne({ userId: req.params.userId })
      .then()
      .catch((err) => {
        console.log(err.message);
      });

    await IssueModel.findOneAndUpdate(
      { issueId: watcherExists["issueId"] },
      { $pull: { watchers: { userId: req.params.userId } } }
    )
      .then((data) => {})
      .catch((err) => console.log(err.message));

    let apiResponse = response.generate(
      false,
      "Stopped watching the issue",
      200,
      null
    );
    return res.send(apiResponse);
  }
};

let getWatchersOfIssue = async (req, res) => {
  try {
    let watchers = await WatcherModel.find({
      issueId: req.params.issueid,
    }).populate("watcher", "firstName");
    if (check.isEmpty(watchers)) {
      logger.error(
        "No watchers found",
        "watcherController:getWatchersOfIssue",
        10
      );
      const apiResponse = response.generate(
        true,
        "No watchers found in the database",
        400,
        null
      );
      res.send(apiResponse);
    } else {
      const apiResponse = response.generate(
        false,
        "Comment found",
        200,
        watchers
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
  createWatcherOfIssue: createWatcherOfIssue,
  getWatchersOfIssue: getWatchersOfIssue,
  removeWatcherOfIssue: removeWatcherOfIssue,
};
