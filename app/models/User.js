"use strict";
/**
 * Module Dependencies
 */
const mongoose = require("mongoose"),
  Schema = mongoose.Schema;

let userSchema = new Schema({
  userId: {
    type: String,
    default: "",
    index: true,
    unique: true,
  },
  firstName: {
    type: String,
    default: "",
    trim: true,
  },
  lastName: {
    type: String,
    default: "",
    trim: true,
  },
  email: {
    type: String,
    default: "",
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    default: "",
    required: true,
    trim: true,
  },
  userRole: {
    type: String,
    default: "normal",
  },
  provider: {
    type: String,
    default: "local",
  },
  createdOn: {
    type: Date,
    default: "",
  },
  avatar: {
    type: String,
    default:
      "https://project-images-upload.s3.amazonaws.com/default-avatar.jpg",
  },
});

mongoose.model("User", userSchema);
