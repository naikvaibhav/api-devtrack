const validateInput = require("./paramsValidation");
const response = require("./responseLib");
const check = require("./checkLib");
const logger = require("./loggerLib");

let Email = (email) => {
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(emailRegex)) {
    return email;
  } else {
    return false;
  }
};

/* Minimum 8 characters which contain only characters,numeric digits, underscore and first character must be a letter */
let Password = (password) => {
  let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (password.match(passwordRegex)) {
    return password;
  } else {
    return false;
  }
};

let signupValidation = (formDetails) => {
  formDetails = { ...formDetails };
  if (formDetails.email) {
    if (!Email(formDetails.email)) {
      console.log("Email id does not meet the requirement");
      let apiResponse = response.generate(
        true,
        "Email id does not meet the requirement",
        400,
        null
      );
      return apiResponse;
    } else if (check.isEmpty(formDetails.password)) {
      console.log("Password is missing");
      let apiResponse = response.generate(
        true,
        "password parameter is missing",
        400,
        null
      );
      return apiResponse;
    } else if (!Password(formDetails.password)) {
      let apiResponse = response.generate(
        true,
        "Password must contain minimum 8 characters which contain only characters,numeric digits, underscore and first character must be a letter",
        400,
        null
      );
      return apiResponse;
    } else {
      return false;
    }
  } else {
    logger.error(
      "Field missing during user creation",
      "userController: signupValidation lib",
      1
    );
    let apiResponse = response.generate(
      true,
      "One or More Parameter(s) is missing",
      null
    );
    return apiResponse;
  }
};

let loginValidation = (formDetails) => {
  formDetails = { ...formDetails };
  if (formDetails.email) {
    if (!Email(formDetails.email)) {
      console.log("Email id does not meet the requirement");
      let apiResponse = response.generate(
        true,
        "Email id does not meet the requirement",
        400,
        null
      );
      return apiResponse;
    } else if (check.isEmpty(formDetails.password)) {
      console.log("Password is missing");
      let apiResponse = response.generate(
        true,
        "password parameter is missing",
        400,
        null
      );
      return apiResponse;
    } else if (!Password(formDetails.password)) {
      let apiResponse = response.generate(
        true,
        "Password must contain minimum 8 characters which contain only characters,numeric digits, underscore and first character must be a letter",
        400,
        null
      );
      return apiResponse;
    } else {
      return false;
    }
  } else {
    logger.error(
      "Field missing during user login",
      "userController:loginValidation lib",
      1
    );
    let apiResponse = response.generate(
      true,
      "One or More Parameter(s) is missing",
      null
    );
    return apiResponse;
  }
};

let createIssueValidation = (formDetails) => {
  if (Object.keys(formDetails).length > 0) {
    if (check.isEmpty(formDetails.issueName)) {
      let apiResponse = response.generate(
        true,
        "Issue name parameter is missing",
        400,
        null
      );
      return apiResponse;
    } else if (check.isEmpty(formDetails.issueDesp)) {
      let apiResponse = response.generate(
        true,
        "Issue description parameter is missing",
        400,
        null
      );
      return apiResponse;
    } else if (check.isEmpty(formDetails.assignee)) {
      let apiResponse = response.generate(
        true,
        "Issue parameter is missing",
        400,
        null
      );
      return apiResponse;
    } else {
      return false;
    }
  } else {
    let apiResponse = response.generate(
      true,
      "More than one field missing",
      500,
      null
    );
    return apiResponse;
  }
};

module.exports = {
  Email: Email,
  Password: Password,
  signupValidation: signupValidation,
  loginValidation: loginValidation,
  createIssueValidation: createIssueValidation,
};
