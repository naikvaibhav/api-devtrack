"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let commentSchema = new Schema({
  issueId: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  commentedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  commentedOn: {
    type: Date,
    default: "",
  },
});

mongoose.model("Comment", commentSchema);
