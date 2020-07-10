"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let watcherSchema = new Schema({
  issueId: {
    type: String,
    required: true,
  },
  watcher: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  userId: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: "",
  },
});

mongoose.model("Watcher", watcherSchema);
