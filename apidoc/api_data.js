define({ "api": [
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/assignedIssues/:assigneedId",
    "title": "api to get all the issues assigned to a user.",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assigneedId",
            "description": "<p>ObjectId of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"All assigned issues\",\n   \"status\": 200,\n   \"data\": [\n       {\n         \"issueId\": \"EJJeyD9eT\",\n         \"issueName\": \"Mean stack admin application\",\n         \"issueDescription\": \"<p>description of Mean stack admin application</p>\",\n         \"status\": \"todo\",\n         \"attachments\": [\n               \"https://project-images-upload.s3.amazonaws.com/New Doc 2018-11-12 16.20.23_6.jpg\",\n               \"https://project-images-upload.s3.amazonaws.com/Leftthumbenhanced.jpg\",\n               \"https://project-images-upload.s3.amazonaws.com/photo.jpg\"\n           ],\n         \"_id\": \"5ee3be105191f739c8ffb66e\",\n         \"watchers\": [\n               {\n                 \"userId\": \"0_jTX41hj\",\n                 \"watcher_id\": \"5edb41e7b98002333431f0e7\"\n               },\n               {\n                 \"userId\": \"0_jTX41hj\",\n                 \"watcher_id\": \"5edb41e7b98002333431f0e8\"\n               }\n           ],\n         \"updateCount\": 0,\n         \"assignee\": \"5ed7461a4693723be0beb90b\",\n         \"reporter\": {\n               \"userId\": \"0_jTX41hj\",\n               \"firstName\": \"vaibhav\",\n               \"lastName\": \"naik\",\n               \"avatar\": \"https://lh4.googleusercontent.com/-Qsx9LedYbVY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhsqBbO3rBXKPpgqzgfcazCJ5EAQ/s96-c/photo.jpg\",\n               \"_id\": \"5edb85c869d3fc026c2d2202\",\n           },\n         \"issueReportedOn\": \"2020-06-12T17:40:32.000Z\",\n         \"__v\": 0\n       }\n    ]\n }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issues",
    "name": "GetApiV1AssignedissuesAssigneedid"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issues",
    "title": "api to get all the issues.",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"All issues\",\n    \"status\": 200,\n    \"data\": [\n        {\n          \"issueId\": \"aPbSv4S_u\",\n          \"issueName\": \"Grocery application\",\n          \"issueDescription\": \"<p><strong>grocery description chan</strong></p>\",\n          \"status\": \"todo\",\n          \"attachments\": [],\n          \"_id\": \"5ee2501d39bb6f33102a82e6\",\n          \"watchers\": [],\n          \"updateCount\": 0,\n          \"assignee\": \"5edb41e7b98002333431f0e7\",\n          \"reporter\": {\n                  \"userId\": \"0_jTX41hj\",\n                  \"firstName\": \"vaibhav\",\n                  \"lastName\": \"naik\",\n                  \"avatar\": \"https://lh4.googleusercontent.com/-Qsx9LedYbVY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhsqBbO3rBXKPpgqzgfcazCJ5EAQ/s96-c/photo.jpg\",\n                  \"_id\": \"5edb85c869d3fc026c2d2202\",\n                },\n          \"issueReportedOn\": \"2020-06-11T15:39:09.000Z\",\n          \"__v\": 0\n        },\n        {\n          \"issueId\": \"EJJeyD9eT\",\n          \"issueName\": \"Mean stack admin application\",\n          \"issueDescription\": \"<p>description of Mean stack admin application</p>\",\n          \"status\": \"todo\",\n          \"attachments\": [\"https://project-images-upload.s3.amazonaws.com/New Doc 2018-11-12 16.20.23_6.jpg\",\n                    \"https://project-images-upload.s3.amazonaws.com/Leftthumbenhanced.jpg\",\n                    \"https://project-images-upload.s3.amazonaws.com/photo.jpg\"\n            ],\n          \"_id\": \"5ee3be105191f739c8ffb66e\",\n          \"watchers\": [\n                  {\n                    \"userId\": \"0_jTX41hj\",\n                    \"watcher_id\": \"5edb41e7b98002333431f0e7\"\n                  },\n          ],\n          \"updateCount\": 0,\n          \"assignee\": \"5ed7461a4693723be0beb90b\",\n          \"reporter\": {\n                \"userId\": \"0_jTX41hj\",\n                \"firstName\": \"vaibhav\",\n                \"lastName\": \"naik\",\n                \"avatar\": \"https://lh4.googleusercontent.com/-Qsx9LedYbVY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhsqBbO3rBXKPpgqzgfcazCJ5EAQ/s96-c/photo.jpg\",\n                \"_id\": \"5edb85c869d3fc026c2d2202\",\n            },\n          \"issueReportedOn\": \"2020-06-12T17:40:32.000Z\",\n          \"__v\": 0\n        }\n      ]\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issues",
    "name": "GetApiV1Issues"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issues/:issueid",
    "title": "api to get details of single issue.",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"Issue found\",\n   \"status\": 200,\n   \"data\": {\n       \"issueId\": \"ampjzfyeq\",\n       \"issueName\": \"iball router\",\n       \"issueDescription\": \"iball router description\",\n       \"status\": \"todo\",\n       \"attachments\": [\n         \"\\\"https://project-images-upload.s3.amazonaws.com/New Doc 2018-11-12 16.20.23_6(2).jpg\\\",\\\"https://project-images-upload.s3.amazonaws.com/Leftthumbenhanced.jpg\\\"\"\n       ],\n       \"_id\": \"5f0723fc4c43242ce8028f6f\",\n       \"assignee\": {\n             \"userId\": \"bqyPHK5ms\",\n             \"firstName\": \"vinayak\",\n             \"lastName\": \"naik\",\n             \"avatar\": \"https://lh6.googleusercontent.com/-mj8SqRigsSM/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmJcY9VaOfyuuuZCnm1Vw91hHsNYw/s96-c/photo.jpg\",\n             \"_id\": \"5edb41e7b98002333431f0e7\",\n         },\n       \"reporter\": {\n             \"userId\": \"0_jTX41hj\",\n             \"firstName\": \"vaibhav\",\n             \"lastName\": \"naik\",\n             \"avatar\": \"https://lh4.googleusercontent.com/-Qsx9LedYbVY/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucmhsqBbO3rBXKPpgqzgfcazCJ5EAQ/s96-c/photo.jpg\",\n             \"_id\": \"5edb85c869d3fc026c2d2202\",\n         },\n       \"issueReportedOn\": \"2020-07-09T14:04:44.000Z\",\n       \"watchers\": [],\n       \"__v\": 0\n     }\n }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issues",
    "name": "GetApiV1IssuesIssueid"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/issues/searchIssue?searchTerm=\"inprogress\"",
    "title": "api to search for issues based on text search.",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "searchTerm",
            "description": "<p>name of text. (query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n   \"error\": false,\n   \"message\": \"All issues fetched\",\n   \"status\": 200,\n   \"data\": {\n       \"issueId\": \"knWvwWfsI\",\n       \"issueName\": \"task1\",\n       \"issueDescription\": \"<p>description of task1</p>\",\n       \"status\": \"inprogress\",\n       \"attachments\": [\n                 \"https://project-images-upload.s3.amazonaws.com/Leftthumbenhanced.jpg\",\n                 \"https://project-images-upload.s3.amazonaws.com/New Doc 2018-11-12 16.20.23_6(2).jpg\"\n         ],\n       \"_id\": \"5f0363909977383cb4a85eeb\",\n       \"watchers\": [],\n       \"updateCount\": 0,\n       \"assignee\": \"5ed7461a4693723be0beb90b\",\n       \"reporter\": {\n             \"userId\": \"CtOE5Y_UH\",\n             \"firstName\": \"Vaibhav\",\n             \"lastName\": \"Naik\",\n             \"avatar\": \"https://project-images-upload.s3.amazonaws.com/default-avatar.jpg\",\n             \"_id\": \"5ed7461a4693723be0beb90b\",\n         },\n       \"issueReportedOn\": \"2020-07-06T17:46:56.000Z\"\n     }\n }",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issues",
    "name": "GetApiV1IssuesSearchissueSearchtermInprogress"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/issues/create",
    "title": "api for creating issue.",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueName",
            "description": "<p>name of issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueDescription",
            "description": "<p>description of issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assignee",
            "description": "<p>objectId of the person to whom the issue will ge assigned. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporter",
            "description": "<p>objectId of the person who is going to create the issue. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "attachments",
            "description": "<p>an array of image url got from AWS S3. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Issue registered successfully\",\n    \"status\": 201,\n    \"data\": {\n        \"issueId\": \"ampjzfyeq\",\n        \"issueName\": \"iball router\",\n        \"issueDescription\": \"iball router description\",\n        \"status\": \"todo\",\n        \"attachments\": [\"\\\"https://project-images-upload.s3.amazonaws.com/New Doc 2018-11-12 16.20.23_6(2).jpg\\\",\\\"https://project-images-upload.s3.amazonaws.com/Leftthumbenhanced.jpg\\\"\"],\n        \"_id\": \"5f0723fc4c43242ce8028f6f\",\n        \"assignee\": \"5edb41e7b98002333431f0e7\",\n        \"reporter\": \"5edb85c869d3fc026c2d2202\",\n        \"issueReportedOn\": \"2020-07-09T14:04:44.000Z\",\n        \"watchers\": [],\n        \"__v\": 0\n      }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issues",
    "name": "PostApiV1IssuesCreate"
  },
  {
    "group": "issues",
    "version": "1.0.0",
    "type": "put",
    "url": "/api/v1/issues/edit/:issueid",
    "title": "api for editing issue.",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueName",
            "description": "<p>name of issue. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "issueDescription",
            "description": "<p>description of issue. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "assignee",
            "description": "<p>objectId of the person to whom the issue will ge assigned. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "reporter",
            "description": "<p>objectId of the person who is going to create the issue. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "attachments",
            "description": "<p>an array of image url got from AWS S3. (body params)</p>"
          },
          {
            "group": "Parameter",
            "type": "array",
            "optional": false,
            "field": "status",
            "description": "<p>of the issue. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Issue is updated\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"opTime\": {\n              \"ts\": \"6847493465551405057\",\n              \"t\": 45\n        },\n        \"electionId\": \"7fffffff000000000000002d\",\n        \"ok\": 1,\n        \"$clusterTime\": {\n                \"clusterTime\": \"6847493465551405057\",\n                \"signature\": {\n                        \"hash\": \"7Rp4deGogNdDNadG0aZ0fsnOaps=\",\n                        \"keyId\": \"6805805048392581121\"\n                  }\n          },\n        \"operationTime\": \"6847493465551405057\"\n      }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/issue.js",
    "groupTitle": "issues",
    "name": "PutApiV1IssuesEditIssueid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userid",
    "title": "api for getting logged in user details.",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authToken",
            "description": "<p>Users unique access-key.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userid",
            "description": "<p>userid of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User details found\",\n    \"status\": 200,\n    \"data\": {\n        \"userId\": \"pSFxj8gyL\",\n        \"firstName\": \"Vinayak\",\n        \"lastName\": \"Naik\",\n        \"email\": \"vinayaknaik1965@gmail.com\",\n        \"password\": \"$2b$10$0LGj6fjY.lzEHgRihr8Ueut2RwoIgvjndi4KWg6Dsucu5wMaNcsyu\",\n        \"userRole\": \"normal\",\n        \"provider\": \"local\",\n        \"createdOn\": \"2020-07-09T11:25:09.000Z\",\n        \"avatar\": \"https://project-images-upload.s3.amazonaws.com/default-avatar.jpg\",\n        \"_id\": \"5f06fe950f935e37b0ef6d08\",\n        \"__v\": 0\n      }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUserid"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/forgotPassword",
    "title": "api for requesting forgot password action.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>registered email id of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Mail has been sent\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersForgotpassword"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user local(without using social login)login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Login successful\",\n    \"status\": 200,\n    \"data\": {\n        \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6Ilo5c2p0bGhBayIsImlhdCI6MTU5NDI5NDI2NjY1MiwiZXhwIjoxNTk0MzgwNjY2LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJ2YWliaGF2IiwiZGF0YSI6eyJ1c2VySWQiOiJwU0Z4ajhneUwiLCJmaXJzdE5hbWUiOiJWaW5heWFrIiwibGFzdE5hbWUiOiJOYWlrIiwiZW1haWwiOiJ2aW5heWFrbmFpazE5NjVAZ21haWwuY29tIiwidXNlclJvbGUiOiJub3JtYWwiLCJwcm92aWRlciI6ImxvY2FsIiwiYXZhdGFyIjoiaHR0cHM6Ly9wcm9qZWN0LWltYWdlcy11cGxvYWQuczMuYW1hem9uYXdzLmNvbS9kZWZhdWx0LWF2YXRhci5qcGciLCJfaWQiOiI1ZjA2ZmU5NTBmOTM1ZTM3YjBlZjZkMDgifX0.cUqD9N_KakjpbhM4Umbsb6QTCMpFwmH4_lg-70Rvpk4\",\n        \"userDetails\": {\n                    \"userId\": \"pSFxj8gyL\",\n                    \"firstName\": \"Vinayak\",\n                    \"lastName\": \"Naik\",\n                    \"email\": \"vinayaknaik1965@gmail.com\",\n                    \"userRole\": \"normal\",\n                    \"provider\": \"local\",\n                    \"avatar\": \"https://project-images-upload.s3.amazonaws.com/default-avatar.jpg\",\n                    \"_id\": \"5f06fe950f935e37b0ef6d08\"\n         }\n      }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/logout",
    "title": "api for logout.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"Logged out successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"opTime\": {\n            \"ts\": \"6847532244811120641\",\n            \"t\": 45\n          },\n        \"electionId\": \"7fffffff000000000000002d\",\n        \"ok\": 1,\n        \"$clusterTime\": {\n              \"clusterTime\": \"6847532244811120641\",\n              \"signature\": {\n                    \"hash\": \"p7bpT3DGivrmy0K1ykmzoh9fcCE=\",\n                    \"keyId\": \"6805805048392581121\"\n              }\n          },\n        \"operationTime\": \"6847532244811120641\",\n        \"deletedCount\": 1\n      }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user local(without using socila login)signup.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>firstName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>lastName of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "avatar",
            "description": "<p>uploaded profile pic of the user. (body params)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": " {\n    \"error\": false,\n    \"message\": \"User registered successfully\",\n    \"status\": 201,\n    \"data\": {\n        \"userId\": \"pSFxj8gyL\",\n        \"firstName\": \"Vinayak\",\n        \"lastName\": \"Naik\",\n        \"email\": \"vinayaknaik1965@gmail.com\",\n        \"userRole\": \"normal\",\n        \"provider\": \"local\",\n        \"createdOn\": \"2020-07-09T11:25:09.000Z\",\n        \"avatar\": \"https://project-images-upload.s3.amazonaws.com/default-avatar.jpg\",\n        \"_id\": \"5f06fe950f935e37b0ef6d08\",\n        \"__v\": 0\n    }\n\n}",
          "type": "object"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  }
] });
