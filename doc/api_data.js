define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/admin/create-mod",
    "title": "create acc mod",
    "name": "Create_mod",
    "group": "Admin",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>username's mod account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password's mod account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>full name's mod</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Create mod success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Create mod success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"username is exist\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/admin.conntroller.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/login",
    "title": "login user",
    "name": "Login_user",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email's  account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password's account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\"\n    role : \"iter\"\n    token : \"xxx.xxx.xxx\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"Email or password is incorrect\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/register-iter",
    "title": "register iter",
    "name": "Register_Iter",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email's  iter account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password's iter account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>full name's iter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>gender's iter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>birthday's iter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>role's iter requre &quot;iter&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Sign up success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Sign up success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"\\\"birthday\\\" is required, \\\"role\\\" is required\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/register-company",
    "title": "register company",
    "name": "Register_company",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email's  company account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password's company account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>name's company</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address's company</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>role's company requre &quot;company&quot;</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Sign up success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Sign up success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"\\\"role\\\" is required\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/reset-password",
    "title": "reset password",
    "name": "Reset_password",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of account need reset password</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code> if everything went fine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"We sent code to your email, tt has a deadline of 5 minutes\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"Email does not exist in the system\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/update-password",
    "title": "update password",
    "name": "Update_password",
    "group": "Auth",
    "header": {
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>current password's  account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "newPassword",
            "description": "<p>new password's account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"password is incorrect\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/change-password",
    "title": "change password reset",
    "name": "change_password",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of account need reset password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>code in your email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>new password need update</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code> if everything went fine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Password has updated\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"Fail\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/api/v1/auth/confirm-code",
    "title": "confirmcode reset password",
    "name": "confrim_code_reset_password",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email of account need reset password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>code in your email</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code> if everything went fine.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"Your code is incorrect\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/api/v1/company/profile",
    "title": "get profile",
    "name": "get_profile",
    "group": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p><code> Objects user</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n    \"user\": {\n            \"_id\": \"601d07f259e12e126c0a2af4\",\n            \"email\": \"yentth239@gmail.com\",\n            \"address\": \"144 nlb\",\n            \"companyName\": \"FPT\",\n            \"roleId\": \"601b9d7cdae0a522ac960fe9\"\n        } \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission get profile\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/company.controller.js",
    "groupTitle": "Company"
  },
  {
    "type": "post",
    "url": "/api/v1/company/profile",
    "title": "update profile",
    "name": "update_profile",
    "group": "Company",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address's company</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "companyName",
            "description": "<p>name's company</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission update profile\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/company.controller.js",
    "groupTitle": "Company"
  },
  {
    "type": "post",
    "url": "/api/v1/feedbacks",
    "title": "create feedback",
    "name": "create_feedback",
    "group": "Feedback",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "content",
            "description": "<p>content's feedback</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission create feedback\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/feedback.controller.js",
    "groupTitle": "Feedback"
  },
  {
    "type": "delete",
    "url": "/api/v1/feedbacks/[feedbackId]",
    "title": "delete feedback",
    "name": "delete_feedback",
    "group": "Feedback",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission delete feedback\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/feedback.controller.js",
    "groupTitle": "Feedback"
  },
  {
    "type": "get",
    "url": "/api/v1/feedbacks",
    "title": "get all feedbacks",
    "name": "get_feedbacks",
    "group": "Feedback",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "feedbacks",
            "description": "<p><code>Array Objects feedback</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n       \"feedbacks\": [\n                {\n                    \"_id\": \"601fc082633e8c3688fc64b2\",\n                    \"userId\": \"601d07f259e12e126c0a2af4\",\n                    \"content\": \"code ngao vl\",\n                    \"createdAt\": \"2021-02-07T10:27:14.957Z\",\n                },\n                {\n                    \"_id\": \"601fc0af633e8c3688fc64b3\",\n                    \"userId\": \"601d07f259e12e126c0a2af4\",\n                    \"content\": \"code ngao vl hihi\",\n                    \"createdAt\": \"2021-02-07T10:27:59.483Z\",\n                }\n]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission get feedbacks\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/feedback.controller.js",
    "groupTitle": "Feedback"
  },
  {
    "type": "get",
    "url": "/api/v1/iter/profile",
    "title": "get profile",
    "name": "get_profile",
    "group": "Iter",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p><code> Objects user</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n      \"user\": {\n            \"_id\": \"6020bd895d7a6b07b0b0eef9\",\n            \"email\": \"yentth@gmail.com\",\n            \"fullName\": \"Le Trung Nam\",\n            \"gender\": \"Male\",\n            \"birthday\": \"23/07/1999\"\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission get profile\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/iter.controller.js",
    "groupTitle": "Iter"
  },
  {
    "type": "post",
    "url": "/api/v1/company/profile",
    "title": "update profile",
    "name": "update_profile",
    "group": "Iter",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "fullName",
            "description": "<p>fullname's company</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "gender",
            "description": "<p>gender's company</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "birthday",
            "description": "<p>birthday's company</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission update profile\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/iter.controller.js",
    "groupTitle": "Iter"
  },
  {
    "type": "post",
    "url": "/api/v1/admin/login",
    "title": "login admin, mod",
    "name": "Login_mod_adminn",
    "group": "Mod",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>username's  account</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>password's account</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\"\n    role : \"moderator\"\n    token : \"xxx.xxx.xxx\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"userName or password is incorrect\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/admin.conntroller.js",
    "groupTitle": "Mod"
  },
  {
    "type": "patch",
    "url": "/api/v1/posts/[postId]/accept-post",
    "title": "accept post",
    "name": "Accept_post",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission accept post\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/post.controller.js",
    "groupTitle": "Post"
  },
  {
    "type": "post",
    "url": "/api/v1/posts",
    "title": "company create post",
    "name": "Create_post",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "skill",
            "description": "<p>vd : [&quot;java&quot;,&quot;nodejs&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "position",
            "description": "<p>vd : [&quot;inter,&quot;fresher&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address's job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "salary",
            "description": "<p>salary's job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endTime",
            "description": "<p>endTime's job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description's job</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission create post\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/post.controller.js",
    "groupTitle": "Post"
  },
  {
    "type": "delete",
    "url": "/api/v1/posts/[postId]",
    "title": "delete post",
    "name": "Delete_post",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission delete post\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/post.controller.js",
    "groupTitle": "Post"
  },
  {
    "type": "put",
    "url": "/api/v1/posts/[postId]",
    "title": "company update post",
    "name": "Update_post",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "skill",
            "description": "<p>vd : [&quot;java&quot;,&quot;nodejs&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "position",
            "description": "<p>vd : [&quot;inter,&quot;fresher&quot;]</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address's job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "salary",
            "description": "<p>salary's job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "endTime",
            "description": "<p>endTime's job</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description's job</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code> if everything went fine.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission update post\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/post.controller.js",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/api/v1/posts/accept",
    "title": "get all accepted post",
    "name": "get_accepted_post",
    "group": "Post",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "posts",
            "description": "<p><code>Array Objects post</code> show all post accept</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n   posts : [\n     {\n      \"skill\": [\n          \"java\",\n          \"nodejs\"\n      ],\n      \"position\": [\n          \"inter\",\n          \"fresher\"\n      ],\n      \"comment\": [],\n      \"_id\": \"601d12b5f391e21c38ea6bfe\",\n      \"companyId\": \"601d07f259e12e126c0a2af4\",\n       \"companyName\": \"FPT\",\n       \"address\": \"1444 nlb\",\n       \"salary\": \"1200 to 2000$\",\n       \"endTime\": \"21/3/2021\",\n       \"description\": \"nodejs >= 3 year experience\",\n       },\n     ......\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/post.controller.js",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/api/v1/posts/accept",
    "title": "get company post",
    "name": "get_company_post",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "posts",
            "description": "<p><code>Array Objects post</code> show all company post</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n   posts : [\n     {\n      \"skill\": [\n          \"java\",\n          \"nodejs\"\n      ],\n      \"position\": [\n          \"inter\",\n          \"fresher\"\n      ],\n      \"comment\": [],\n      \"_id\": \"601d12b5f391e21c38ea6bfe\",\n      \"companyId\": \"601d07f259e12e126c0a2af4\",\n       \"companyName\": \"FPT\",\n       \"address\": \"1444 nlb\",\n       \"salary\": \"1200 to 2000$\",\n       \"endTime\": \"21/3/2021\",\n       \"description\": \"nodejs >= 3 year experience\",\n       },\n     ......\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/post.controller.js",
    "groupTitle": "Post"
  },
  {
    "type": "get",
    "url": "/api/v1/posts/need-accept",
    "title": "get all post need  accept",
    "name": "get_post_need_accept",
    "group": "Post",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>The token can be generated from your user profile.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example",
          "content": "\"Authorization: Bearer AAA.BBB.CCC\"",
          "type": "Header"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "status",
            "description": "<p><code>200</code></p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p><code>Success</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "posts",
            "description": "<p><code>Array Objects post</code> show all post need accept</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n   posts : [\n     {\n      \"skill\": [\n          \"java\",\n          \"nodejs\"\n      ],\n      \"position\": [\n          \"inter\",\n          \"fresher\"\n      ],\n      \"comment\": [],\n      \"_id\": \"601d12b5f391e21c38ea6bfe\",\n      \"companyId\": \"601d07f259e12e126c0a2af4\",\n       \"companyName\": \"FPT\",\n       \"address\": \"1444 nlb\",\n       \"salary\": \"1200 to 2000$\",\n       \"endTime\": \"21/3/2021\",\n       \"description\": \"nodejs >= 3 year experience\",\n        \"createdAt\": \"2021-02-05T09:41:09.446Z\"\n       },\n     ....\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission create post\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/post.controller.js",
    "groupTitle": "Post"
  }
] });
