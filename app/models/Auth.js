"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;
const time = require("./../libs/timeLib");

let authSchema = new Schema({
  userId: {
    type: String,
  },
  authToken: {
    type: String,
  },
  tokenSecret: {
    type: String,
  },
  tokenGenerationTime: {
    type: Date,
    default: time.now(),
  },
});

mongoose.model("Auth", authSchema);
