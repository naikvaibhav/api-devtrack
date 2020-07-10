"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let issueSchema = new Schema({
  issueId: {
    type: String,
    default: "",
  },
  issueName: {
    type: String,
    default: "",
    trim: true,
  },
  issueDescription: {
    type: String,
    default: "",
    trim: true,
  },
  status: {
    type: String,
    default: "todo",
  },
  assignee: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reporter: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  attachments: {
    type: Array,
  },
  issueReportedOn: {
    type: Date,
  },
  issueUpdatedOn: {
    type: Date,
  },
  watchers: [
    {
      userId: String,
      watcher_id: String,
    },
  ],
});

issueSchema.index({ "$**": "text" });

mongoose.model("Issue", issueSchema);
