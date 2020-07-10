const express = require("express");
const router = express.Router();
const issueController = require("./../controllers/issueController");
const appConfig = require("./../../config/appConfig");
const upload = require("../middlewares/file-upload");

//middleware
const auth = require("../middlewares/auth");

module.exports.setRouter = (app) => {
  let baseUrl = `${appConfig.apiVersion}/issues`;

  // defining routes.

  // params: issueName, issueDescription, assignee, reporter, attachments.
  app.post(`${baseUrl}/create`, auth.isAuthorized, issueController.createIssue);
  /**
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {post} /api/v1/issues/create api for creating issue.
     * @apiHeader {String} authToken Users unique access-key.
     *
     * @apiParam {string} issueName name of issue. (body params) (required)
     * @apiParam {string} issueDescription description of issue. (body params) (required)
     * @apiParam {string} assignee objectId of the person to whom the issue will ge assigned. (body params) (required)
     * @apiParam {string} reporter objectId of the person who is going to create the issue. (body params) (required)
     * @apiParam {array} attachments an array of image url got from AWS S3. (body params)
     * 
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Issue registered successfully",
            "status": 201,
            "data": {
                "issueId": "ampjzfyeq",
                "issueName": "iball router",
                "issueDescription": "iball router description",
                "status": "todo",
                "attachments": ["\"https://project-images-upload.s3.amazonaws.com/New Doc 2018-11-12 16.20.23_6(2).jpg\",\"https://project-images-upload.s3.amazonaws.com/Leftthumbenhanced.jpg\""],
                "_id": "5f0723fc4c43242ce8028f6f",
                "assignee": "5edb41e7b98002333431f0e7",
                "reporter": "5edb85c869d3fc026c2d2202",
                "issueReportedOn": "2020-07-09T14:04:44.000Z",
                "watchers": [],
                "__v": 0
              }

        }
    */

  // params:
  app.get(`${baseUrl}`, auth.isAuthorized, issueController.getAllIssues);
  /**
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issues api to get all the issues.
     * @apiHeader {String} authToken Users unique access-key.
     *
     * 
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All issues",
            "status": 200,
            "data": [
                {
                  "issueId": "aPbSv4S_u",
                  "issueName": "Grocery application",
                  "issueDescription": "<p><strong>grocery description chan</strong></p>",
                  "status": "todo",
                  "attachments": [],
                  "_id": "5ee2501d39bb6f33102a82e6",
                  "watchers": [],
                  "updateCount": 0,
                  "assignee": "5edb41e7b98002333431f0e7",
                  "reporter": {
                          "userId": "0_jTX41hj",
                          "firstName": "vaibhav",
                          "lastName": "naik",
                          "avatar": "https://lh4.googleusercontent.com/-Qsx9LedYbVY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhsqBbO3rBXKPpgqzgfcazCJ5EAQ/s96-c/photo.jpg",
                          "_id": "5edb85c869d3fc026c2d2202",
                        },
                  "issueReportedOn": "2020-06-11T15:39:09.000Z",
                  "__v": 0
                },
                {
                  "issueId": "EJJeyD9eT",
                  "issueName": "Mean stack admin application",
                  "issueDescription": "<p>description of Mean stack admin application</p>",
                  "status": "todo",
                  "attachments": ["https://project-images-upload.s3.amazonaws.com/New Doc 2018-11-12 16.20.23_6.jpg",
                            "https://project-images-upload.s3.amazonaws.com/Leftthumbenhanced.jpg",
                            "https://project-images-upload.s3.amazonaws.com/photo.jpg"
                    ],
                  "_id": "5ee3be105191f739c8ffb66e",
                  "watchers": [
                          {
                            "userId": "0_jTX41hj",
                            "watcher_id": "5edb41e7b98002333431f0e7"
                          },
                  ],
                  "updateCount": 0,
                  "assignee": "5ed7461a4693723be0beb90b",
                  "reporter": {
                        "userId": "0_jTX41hj",
                        "firstName": "vaibhav",
                        "lastName": "naik",
                        "avatar": "https://lh4.googleusercontent.com/-Qsx9LedYbVY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhsqBbO3rBXKPpgqzgfcazCJ5EAQ/s96-c/photo.jpg",
                        "_id": "5edb85c869d3fc026c2d2202",
                    },
                  "issueReportedOn": "2020-06-12T17:40:32.000Z",
                  "__v": 0
                }
              ]
        }
    */

  // params:assigneedId
  app.get(
    `${appConfig.apiVersion}/assignedIssues/:assigneedId`,
    auth.isAuthorized,
    issueController.getAssignedIssuedToMe
  );
  /**
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/assignedIssues/:assigneedId api to get all the issues assigned to a user.
     * @apiHeader {String} authToken Users unique access-key.
     *
     * @apiParam {string} assigneedId ObjectId of the user. (route params) (required)
     * 
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All assigned issues",
            "status": 200,
            "data": [
                {
                  "issueId": "EJJeyD9eT",
                  "issueName": "Mean stack admin application",
                  "issueDescription": "<p>description of Mean stack admin application</p>",
                  "status": "todo",
                  "attachments": [
                        "https://project-images-upload.s3.amazonaws.com/New Doc 2018-11-12 16.20.23_6.jpg",
                        "https://project-images-upload.s3.amazonaws.com/Leftthumbenhanced.jpg",
                        "https://project-images-upload.s3.amazonaws.com/photo.jpg"
                    ],
                  "_id": "5ee3be105191f739c8ffb66e",
                  "watchers": [
                        {
                          "userId": "0_jTX41hj",
                          "watcher_id": "5edb41e7b98002333431f0e7"
                        },
                        {
                          "userId": "0_jTX41hj",
                          "watcher_id": "5edb41e7b98002333431f0e8"
                        }
                    ],
                  "updateCount": 0,
                  "assignee": "5ed7461a4693723be0beb90b",
                  "reporter": {
                        "userId": "0_jTX41hj",
                        "firstName": "vaibhav",
                        "lastName": "naik",
                        "avatar": "https://lh4.googleusercontent.com/-Qsx9LedYbVY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhsqBbO3rBXKPpgqzgfcazCJ5EAQ/s96-c/photo.jpg",
                        "_id": "5edb85c869d3fc026c2d2202",
                    },
                  "issueReportedOn": "2020-06-12T17:40:32.000Z",
                  "__v": 0
                }
             ]
          }
    */

  app.get(
    `${appConfig.apiVersion}/count/:assigneedId`,
    auth.isAuthorized,
    issueController.getCounts
  );

  // params:issueid
  app.put(
    `${baseUrl}/edit/:issueid`,
    auth.isAuthorized,
    issueController.editIssue
  );
  /**
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {put} /api/v1/issues/edit/:issueid api for editing issue.
     * @apiHeader {String} authToken Users unique access-key.
     *
     * @apiParam {string} issueName name of issue. (body params)
     * @apiParam {string} issueDescription description of issue. (body params) 
     * @apiParam {string} assignee objectId of the person to whom the issue will ge assigned. (body params) 
     * @apiParam {string} reporter objectId of the person who is going to create the issue. (body params) 
     * @apiParam {array} attachments an array of image url got from AWS S3. (body params)
     * @apiParam {array} status of the issue. (body params)
     * 
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Issue is updated",
            "status": 200,
            "data": {
                "n": 1,
                "nModified": 1,
                "opTime": {
                      "ts": "6847493465551405057",
                      "t": 45
                },
                "electionId": "7fffffff000000000000002d",
                "ok": 1,
                "$clusterTime": {
                        "clusterTime": "6847493465551405057",
                        "signature": {
                                "hash": "7Rp4deGogNdDNadG0aZ0fsnOaps=",
                                "keyId": "6805805048392581121"
                          }
                  },
                "operationTime": "6847493465551405057"
              }

        }
    */

  // params:issueid
  app.get(
    `${baseUrl}/:issueid`,
    auth.isAuthorized,
    issueController.getSingleIssue
  );
  /**
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issues/:issueid api to get details of single issue.
     * @apiHeader {String} authToken Users unique access-key.
     *
     * 
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "Issue found",
            "status": 200,
            "data": {
                "issueId": "ampjzfyeq",
                "issueName": "iball router",
                "issueDescription": "iball router description",
                "status": "todo",
                "attachments": [
                  "\"https://project-images-upload.s3.amazonaws.com/New Doc 2018-11-12 16.20.23_6(2).jpg\",\"https://project-images-upload.s3.amazonaws.com/Leftthumbenhanced.jpg\""
                ],
                "_id": "5f0723fc4c43242ce8028f6f",
                "assignee": {
                      "userId": "bqyPHK5ms",
                      "firstName": "vinayak",
                      "lastName": "naik",
                      "avatar": "https://lh6.googleusercontent.com/-mj8SqRigsSM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmJcY9VaOfyuuuZCnm1Vw91hHsNYw/s96-c/photo.jpg",
                      "_id": "5edb41e7b98002333431f0e7",
                  },
                "reporter": {
                      "userId": "0_jTX41hj",
                      "firstName": "vaibhav",
                      "lastName": "naik",
                      "avatar": "https://lh4.googleusercontent.com/-Qsx9LedYbVY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhsqBbO3rBXKPpgqzgfcazCJ5EAQ/s96-c/photo.jpg",
                      "_id": "5edb85c869d3fc026c2d2202",
                  },
                "issueReportedOn": "2020-07-09T14:04:44.000Z",
                "watchers": [],
                "__v": 0
              }
          }
    */

  app.post(
    `${appConfig.apiVersion}/upload`,
    upload.upload.array("image", 3),
    issueController.uploadImage
  );

  app.put(
    `${appConfig.apiVersion}/deleteImage`,
    upload.deleteImage,
    issueController.deleteImage
  );

  // params:searchTerm
  app.get(`${baseUrl}/issue/searchIssue`, issueController.searchIssue);
  /**
     * @apiGroup issues
     * @apiVersion  1.0.0
     * @api {get} /api/v1/issues/searchIssue?searchTerm="inprogress" api to search for issues based on text search.
     * @apiHeader {String} authToken Users unique access-key.
     *
     * 
     * @apiParam {string} searchTerm name of text. (query params) (required)
     * 
     *
     * @apiSuccess {object} myResponse shows error status, message, http status code, result.
     * 
     * @apiSuccessExample {object} Success-Response:
         {
            "error": false,
            "message": "All issues fetched",
            "status": 200,
            "data": {
                "issueId": "knWvwWfsI",
                "issueName": "task1",
                "issueDescription": "<p>description of task1</p>",
                "status": "inprogress",
                "attachments": [
                          "https://project-images-upload.s3.amazonaws.com/Leftthumbenhanced.jpg",
                          "https://project-images-upload.s3.amazonaws.com/New Doc 2018-11-12 16.20.23_6(2).jpg"
                  ],
                "_id": "5f0363909977383cb4a85eeb",
                "watchers": [],
                "updateCount": 0,
                "assignee": "5ed7461a4693723be0beb90b",
                "reporter": {
                      "userId": "CtOE5Y_UH",
                      "firstName": "Vaibhav",
                      "lastName": "Naik",
                      "avatar": "https://project-images-upload.s3.amazonaws.com/default-avatar.jpg",
                      "_id": "5ed7461a4693723be0beb90b",
                  },
                "issueReportedOn": "2020-07-06T17:46:56.000Z"
              }
          }
    */
};
