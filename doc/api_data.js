define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/moderators",
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
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/admin.controller.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/api/v1/permissions",
    "title": "get permissions",
    "name": "Get_permissions",
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
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -X GET -H \"Authorization: token 5f048fe\" -i https://api.example.com/api/v1/permissions?role=iter",
        "type": "bash"
      }
    ],
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
            "description": "<p><code>Create mod success</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "permissions",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n    permissions: [\n        {\n            \"check\": true,\n            \"_id\": \"6048a3b886af931754624be1\",\n            \"role\": \"iter\",\n            \"perName\": \"cancel receive email job\",\n            \"actionCode\": \"CANCEL_RECEIVE_MAIL\"\n        },\n        {\n            \"check\": true,\n            \"_id\": \"6048a3b886af931754624bdf\",\n            \"role\": \"iter\",\n            \"perName\": \"create new cv\",\n            \"actionCode\": \"CREATE_CV\"\n        },\n        {\n            \"check\": true,\n            \"_id\": \"6048a3b886af931754624be0\",\n            \"role\": \"iter\",\n            \"perName\": \"register receive email job\",\n            \"actionCode\": \"RECEIVE_MAIL\"\n        }\n    ]\n\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"No token, authorization denied\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/permission.controller.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/api/v1/users/:id/permissions",
    "title": "get user permissions",
    "name": "Get_user_permissions",
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
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -X GET -H \"Authorization: token 5f048fe\" -i https://api.example.com/api/v1/users/646dgdh/permissions",
        "type": "bash"
      }
    ],
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
            "description": "<p><code>Create mod success</code></p>"
          },
          {
            "group": "Success 200",
            "type": "Array",
            "optional": false,
            "field": "permissions",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n    \"permissions\": {\n    \"_id\": \"6048d0149f2a0a2a14fdb3a8\",\n    \"userId\": \"6048d0139f2a0a2a14fdb3a7\",\n    \"permissions\": [\n        {\n            \"_id\": \"6048d0149f2a0a2a14fdb3a9\",\n            \"actionCode\": \"CREATE_MOD\",\n            \"check\": true\n        },\n        {\n            \"_id\": \"6048d0149f2a0a2a14fdb3aa\",\n            \"actionCode\": \"VIEW_POSTS_NEED_ACCEPT\",\n            \"check\": true\n        },\n        {\n            \"_id\": \"6048d0149f2a0a2a14fdb3ab\",\n            \"actionCode\": \"ACCEPT_POST\",\n            \"check\": true\n        }\n    ],\n    \"createdAt\": \"2021-03-10T13:56:36.563Z\",\n    \"updatedAt\": \"2021-03-10T13:56:36.563Z\",\n    \"__v\": 0\n}\n\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"No token, authorization denied\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/permission.controller.js",
    "groupTitle": "Admin"
  },
  {
    "type": "post",
    "url": "/api/v1/admin/login",
    "title": "login admin, mod",
    "name": "Login_mod_admin",
    "group": "Admin",
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
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\"\n    role : \"moderator\"\n    token : \"xxx.xxx.xxx\"\n    userName : \"mod22\"\n}",
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
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/admin.controller.js",
    "groupTitle": "Admin"
  },
  {
    "type": "delete",
    "url": "/api/v1/moderators/:id",
    "title": "delete mod",
    "name": "delete_mod",
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
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/admin.controller.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/api/v1/moderators",
    "title": "get all moderators",
    "name": "get_all_moderators",
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
            "field": "mods",
            "description": "<p><code>Success</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n        status: 200,\n        msg: \"Success\",\n           \"data\": {\n                \"page\": 1,\n                \"numPages\": 2,\n                \"result\": [\n                    {\n                        \"_id\": \"605b34cfd16e2c00151b1f05\",\n                        \"userName\": \"admin\",\n                        \"createdAt\": \"2021-03-24T12:47:11.141Z\"\n                    },\n                    {\n                        \"_id\": \"60650f786f6c98001512685e\",\n                        \"userName\": \"moderator1\",\n                        \"createdAt\": \"2021-04-01T00:10:32.452Z\"\n                    },\n                ]\n            }\n        }\norExample Response (example):\n    HTTP/1.1 401\n    {\n      \"status\" : 401,\n      \"msg\": \"No token, authorization denied\"\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/admin.controller.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/api/v1/permissions",
    "title": "update permissions of role",
    "name": "update_permissions_of_role",
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
            "type": "array",
            "optional": false,
            "field": "permissions",
            "description": "<p>permissions's role</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "role",
            "description": "<p>name's role</p>"
          },
          {
            "group": "Parameter",
            "type": "Boolean",
            "optional": false,
            "field": "apply",
            "description": ""
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
          "content": "    HTTP/1.1 200 OK\n    {\n        status: 200,\n        msg: \"Success\",\n        }\norExample Response (example):\n    HTTP/1.1 401\n    {\n      \"status\" : 401,\n      \"msg\": \"No token, authorization denied\"\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/permission.controller.js",
    "groupTitle": "Admin"
  },
  {
    "type": "put",
    "url": "/api/v1/users/:id/permissions",
    "title": "update user permissions",
    "name": "update_user_permissions",
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
            "type": "array",
            "optional": false,
            "field": "permissions",
            "description": "<p>permissions's user</p>"
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
          "content": "    HTTP/1.1 200 OK\n    {\n        status: 200,\n        msg: \"Success\",\n        }\norExample Response (example):\n    HTTP/1.1 401\n    {\n      \"status\" : 401,\n      \"msg\": \"No token, authorization denied\"\n    }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/permission.controller.js",
    "groupTitle": "Admin"
  },
  {
    "type": "get",
    "url": "/api/v1/analysis/post",
    "title": "analyze post",
    "name": "analyze_post",
    "group": "Analysis",
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
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -H \"Authorization: token 5f048fe\" -i https://api.example.com/api/v1/analysis/post?year=2021",
        "type": "bash"
      }
    ],
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
            "field": "data",
            "description": "<p><code>data</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": 200,\n    \"msg\": \"Success\",\n    \"data\": [\n        1,\n        0,\n        0,\n        1,\n        20,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0,\n        0\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/analysis.contoller.js",
    "groupTitle": "Analysis"
  },
  {
    "type": "get",
    "url": "/api/v1/analysis/skill",
    "title": "analyze skill",
    "name": "analyze_skill",
    "group": "Analysis",
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
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -H \"Authorization: token 5f048fe\" -i https://api.example.com/api/v1/analysis/skill?option=month&month=5&year=2021",
        "type": "bash"
      }
    ],
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
            "field": "data",
            "description": "<p><code>data</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n    \"status\": 200,\n    \"msg\": \"Success\",\n    \"data\": [\n        {\n            \"C\": 1\n        },\n        {\n            \"C++\": 1\n        },\n        {\n            \"C#\": 3\n        },\n        {\n            \"Java\": 9\n        },\n        {\n            \"Javascript\": 8\n        },\n        {\n            \"PHP\": 1\n        },\n        {\n            \"Python\": 6\n        }\n    ]\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/analysis.contoller.js",
    "groupTitle": "Analysis"
  },
  {
    "type": "get",
    "url": "/api/v1/analysis/user",
    "title": "analyze user",
    "name": "analyze_user",
    "group": "Analysis",
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
            "field": "data",
            "description": "<p><code>data</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n {\n    \"status\": 200,\n    \"msg\": \"Success\",\n    \"data\": {\n        \"numberOfIter\": 15,\n        \"numberOfCompany\": 7\n    }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/analysis.contoller.js",
    "groupTitle": "Analysis"
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
          "content": "    HTTP/1.1 200 OK\n    {\n        status: 200,\n        msg: \"Success\"\n        role : \"iter\"\n        token : \"xxx.xxx.xxx\",\n        name : \"Le trung nam\",\n\t\t   image:\"https://anh.png\"\n    }",
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
            "field": "name",
            "description": "<p>name's iter</p>"
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
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"password length must be at least 6 characters long\"\n}",
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
            "field": "name",
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
          "content": "HTTP/1.1 400\n{\n  \"status\" : 400,\n  \"msg\": \"password length must be at least 6 characters long\"\n}",
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
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"We sent code to your email, the code only lasts for 5 minutes\"\n}",
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
    "title": "confirm code reset password",
    "name": "confỉrm_code_reset_password",
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
    "url": "/api/v1/auth/profile",
    "title": "get profile",
    "name": "get_profile",
    "group": "Auth",
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
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n    \"user\": {\n            \"_id\": \"601d07f259e12e126c0a2af4\",\n            \"email\": \"yentth239@gmail.com\",\n            \"name\": \"FPT\",\n            \"roleId\": \"601b9d7cdae0a522ac960fe9\"\n        } \n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 400\n{\n  \"status\" : 401,\n  \"msg\": \"user not found\"\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "patch",
    "url": "/api/v1/auth/profile",
    "title": "update profile",
    "name": "update_user_profile",
    "group": "Auth",
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
            "field": "name",
            "description": "<p>name's user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>phone's user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>link image's user</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>address's user</p>"
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
          "content": "HTTP/1.1 404\n{\n  \"status\" : 404,\n  \"msg\": \"User not found\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/auth.controller.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "/api/v1/companies/:id",
    "title": "delete a company",
    "name": "delete_a_company",
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
    "type": "get",
    "url": "/api/v1/companies",
    "title": "get all companies",
    "name": "get_all_companies",
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
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -H \"Authorization: token 5f048fe\" -i https://api.example.com/api/v1/companies?page=2&take=3",
        "type": "bash"
      }
    ],
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
            "field": "data",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n        status: 200,\n        msg: \"Success\",\n\t\t\t\"data\": {\n            \"page\": 1,\n            \"numPages\": 1,\n            \"result\": [\n                {\n                    \"_id\": \"606491e8831e840015befef9\",\n                    \"name\": \"Madison Technology \",\n                    \"accountId\": \"606491e7831e840015befeee\",\n                    \"email\": \"com1@gmail.com\",\n                    \"createdAt\": \"2021-03-31T15:14:48.629Z\",\n                }\n            ]\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/company.controller.js",
    "groupTitle": "Company"
  },
  {
    "type": "get",
    "url": "/api/v1/companies/info",
    "title": "get info all companies",
    "name": "get_info_all_companies",
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
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -H \"Authorization: token 5f048fe\" -i https://api.example.com/api/v1/companies/info?page=2&take=3",
        "type": "bash"
      }
    ],
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
            "field": "data",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n        status: 200,\n        msg: \"Success\",\n\t\t\t\"data\": {\n\t\t\t\t\"page\": 1,\n\t\t\t\t\"numPages\": 1,\n\t\t\t\t\"result\": [\n\t\t\t\t{\n\t\t\t\t\t\"recruitingPost\": 6,\n\t\t\t\t\t\"_id\": \"606491e8831e840015befef9\",\n\t\t\t\t\t\"accountId\": \"606491e7831e840015befeee\",\n\t\t\t\t\t\"email\": \"com1@gmail.com\",\n\t\t\t\t\t\"image\": \"http://res.cloudinary.com/do-an-cnpm/image/upload/v1620669960/dxkffb9kic51ylcmxm3b.jpg\",\n\t\t\t\t\t\"phone\": \"0989402047\",\n\t\t\t\t\t\"address\": \"Hà Nội\",\n\t\t\t\t\t\"name\": \"Nam's Company\"\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\t\"recruitingPost\": 4,\n\t\t\t\t\t\"_id\": \"6080de64035f0700159c8582\",\n\t\t\t\t\t\"accountId\": \"6080de64035f0700159c8577\",\n\t\t\t\t\t\"email\": \"com1@gmail.com\",\n\t\t\t\t\t\"image\": \"http://res.cloudinary.com/do-an-cnpm/image/upload/v1620669960/dxkffb9kic51ylcmxm3b.jpg\",\n\t\t\t\t\t\"phone\": \"0989402047\",\n\t\t\t\t\t\"address\": \"Hà Nội\",\n\t\t\t\t\t\"name\": \"Nam's Company\"\n\t\t\t\t},\n\t\t\t]\n    }",
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
    "url": "/api/v1/cv",
    "title": "create cv",
    "name": "Create_cv",
    "group": "Cv",
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
            "field": "skill",
            "description": "<p>tech skill</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "softSkill",
            "description": "<p>soft Skill's jcv</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "experience",
            "description": "<p>experience's cv</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description's cv</p>"
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
            "field": "image",
            "description": "<p>link image's cv</p>"
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
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Create cv successfully\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/cv.controller.js",
    "groupTitle": "Cv"
  },
  {
    "type": "get",
    "url": "/api/v1/cv/:id",
    "title": "get a cv",
    "name": "Get_a_cv",
    "group": "Cv",
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
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "cv",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n    \"cv\": {\n            \"skill\": [\n                \"C++\"\n            ],\n            \"receiveMail\": false,\n            \"_id\": \"605a9e1afcedab20d405cc4c\",\n            \"iterId\": \"605a9df9fcedab20d405cc44\",\n            \"name\": \"nam le\",\n            \"softSkill\": \"Good community\",\n            \"experience\": \"1 nam kn c++\",\n            \"description\": \"la mot nguoi tot\",\n            \"email\": \"it1@gmail.com\"\n        }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/cv.controller.js",
    "groupTitle": "Cv"
  },
  {
    "type": "get",
    "url": "/api/v1/cv/user",
    "title": "get a cv by iter",
    "name": "Get_a_cv_by_iter",
    "group": "Cv",
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
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "cv",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n    \"cv\": {\n          \"skill\": C++\",\n         \"receiveMail\": false,\n          \"_id\": \"605a9e1afcedab20d405cc4c\",\n          \"iterId\": \"605a9df9fcedab20d405cc44\",\n          \"name\": \"nam le\",\n          \"softSkill\": \"Good community\",\n          \"experience\": \"1 nam kn c++\",\n          \"description\": \"la mot nguoi tot\",\n          \"email\": \"it1@gmail.com\"\n      }\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/cv.controller.js",
    "groupTitle": "Cv"
  },
  {
    "type": "patch",
    "url": "/api/v1/cv",
    "title": "update cv",
    "name": "Update_cv",
    "group": "Cv",
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
            "field": "skill",
            "description": "<p>tech skill</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>name iter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email iter</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "softSkill",
            "description": "<p>soft Skill's cv</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "experience",
            "description": "<p>experience's cv</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>description's cv</p>"
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
            "field": "image",
            "description": "<p>link image's cv</p>"
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
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/cv.controller.js",
    "groupTitle": "Cv"
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
    "url": "/api/v1/feedbacks/{feedbackId}",
    "title": "delete a feedback",
    "name": "delete_a_feedback",
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
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n       \"feedbacks\": [\n                {\n                    \"_id\": \"601fc082633e8c3688fc64b2\",\n                    \"userId\": \"601d07f259e12e126c0a2af4\",\n                    \"content\": \"code te\",\n                    \"createdAt\": \"2021-02-07T10:27:14.957Z\",\n                },\n                {\n                    \"_id\": \"601fc0af633e8c3688fc64b3\",\n                    \"userId\": \"601d07f259e12e126c0a2af4\",\n                    \"content\": \"code hay\",\n                    \"createdAt\": \"2021-02-07T10:27:59.483Z\",\n                }\n]\n}",
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
    "url": "/api/v1/images",
    "title": "get payload signature cloudinary",
    "name": "get_payload_signature_cloudinary",
    "group": "Image",
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
            "field": "payload",
            "description": "<p><code>Success</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n        status: 200,\n        msg: \"Success\",\n\"payload\": {\n                \"signature\": \"d47b348722d72d392dbf92f7abeeed3a0f49c9fc\",\n                \"timestamp\": 1617872195\n            }\n    }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/image.controller.js",
    "groupTitle": "Image"
  },
  {
    "type": "patch",
    "url": "/api/v1/iters/receive-mail",
    "title": "register/cancel receive email",
    "name": "Register/cancel_receive_email",
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
            "type": "Boolean",
            "optional": false,
            "field": "receive",
            "description": ""
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
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"You have subscribed to receive email for job search\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Response (example):",
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/iter.controller.js",
    "groupTitle": "Iter"
  },
  {
    "type": "delete",
    "url": "/api/v1/iters/:id",
    "title": "delete iter",
    "name": "delete_iter",
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
    "type": "get",
    "url": "/api/v1/iters",
    "title": "get all iters",
    "name": "get_all_iters",
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
    "examples": [
      {
        "title": "Curl example",
        "content": "curl -H \"Authorization: token 5f048fe\" -i https://api.example.com/api/v1/iters?page=2&take=3",
        "type": "bash"
      }
    ],
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
            "field": "data",
            "description": ""
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n    \"data\": {\n            \"page\": 1,\n            \"numPages\": 1,\n            \"result\": [\n                {\n                    \"receiveMailJob\": false,\n                    \"_id\": \"605af5b86bad1f00159d773f\",\n                    \"name\": \"thang\",\n                    \"accountId\": \"605af5b76bad1f00159d7738\",\n                    \"email\": \"thang@gmail.com\",\n                    \"createdAt\": \"2021-03-24T08:18:00.272Z\",\n                    \"image\": \"https://res.cloudinary.com/do-an-cnpm/image/upload/v1617869793/ajdi4nvzeiasleeplveo.jpg\"\n                },\n                {\n                    \"receiveMailJob\": false,\n                    \"_id\": \"6062ad983bbee800153a7b80\",\n                    \"name\": \"nam le\",\n                    \"accountId\": \"6062ad973bbee800153a7b78\",\n                    \"email\": \"it@gmail.com\",\n                    \"createdAt\": \"2021-03-30T04:48:24.125Z\",\n                    \"image\": \"https://res.cloudinary.com/do-an-cnpm/image/upload/v1617869793/ajdi4nvzeiasleeplveo.jpg\"\n                },\n            ]\n}",
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
    "type": "patch",
    "url": "/api/v1/posts/accept-many",
    "title": "accept many posts",
    "name": "Accept_many_posts",
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
            "field": "listId",
            "description": "<p>list _id post need accept</p>"
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
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/post.controller.js",
    "groupTitle": "Post"
  },
  {
    "type": "patch",
    "url": "/api/v1/posts/{postId}/accept-post",
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
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
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
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>title's job</p>"
          },
          {
            "group": "Parameter",
            "type": "Array",
            "optional": false,
            "field": "skill",
            "description": "<p>vd : [&quot;java&quot;,&quot;nodejs&quot;]</p>"
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
    "url": "/api/v1/posts/{postId}",
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
    "url": "/api/v1/posts/{_id}/apply",
    "title": "apply post",
    "name": "apply_post",
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
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/post.controller.js",
    "groupTitle": "Post"
  },
  {
    "type": "patch",
    "url": "/api/v1/posts/{postId}/complete",
    "title": "complete post",
    "name": "complete_post",
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
          "content": "HTTP/1.1 401\n{\n  \"status\" : 401,\n  \"msg\": \"Denny permission\"\n}",
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
    "url": "/api/v1/posts",
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
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n      \"currentPage\": 2,\n      \"numPages\": 2,\n    posts : [\n     \"posts\": [\n        {\n            \"_id\": \"609cee9552522300152fd701\",\n            \"skill\": [\n                \"ReactJS\"\n            ],\n            \"accountId\": \"609cab88c85020001578a9a9\",\n            \"companyId\": \"609cab89c85020001578a9b0\",\n            \"title\": \"Front-end Developer\",\n            \"address\": \"Da Nang\",\n            \"salary\": \"2000$\",\n            \"endTime\": \"1/6/2021\",\n            \"description\": \"Work for international customers\\nWork with colleagues from Germany, France, the Czech Republic and the US\\nBe responsible for the success of your project\\nDesign, implement and test web applications\\nCollaborate on requirement analysis and specifications\\nShare knowledge and experience with your colleagues\\nWorking time: 40 hours / week, flexible\",\n            \"apply\": [],\n            \"company\": [\n                {\n                    \"name\": \"CES\",\n                    \"accountId\": \"609cab88c85020001578a9a9\",\n                    \"email\": \"ces@gmail.com\",\n                    \"address\": \"Da Nang\",\n                    \"image\": \"http://res.cloudinary.com/do-an-cnpm/image/upload/v1620895774/fw8o6u4nyi2vdzet8yh2.jpg\",\n                    \"phone\": \"0123456789\"\n                }\n            ],\n        },\n     ......\n    ]\n}",
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
    "url": "/api/v1/posts/company",
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
          "content": "HTTP/1.1 200 OK\n{\n    status: 200,\n    msg: \"Success\",\n   \"posts\": [\n    {\n        \"_id\": \"608bc604e78f864568466972\",\n        \"skill\": [\n            \"C#\",\n            \"Python\"\n        ],\n        \"status\": \"WAITING\",\n        \"accountId\": \"606491e7831e840015befeee\",\n        \"companyId\": \"606491e8831e840015befef9\",\n        \"title\": \"Recruiting Dev ops \",\n        \"address\": \"Ha Noi\",\n        \"salary\": \"1000 - 2000 $\",\n        \"endTime\": \"2021-05-29\",\n        \"description\": \"1 years experience python\",\n        \"company\": [\n            {\n                \"_id\": \"606491e8831e840015befef9\",\n                \"accountId\": \"606491e7831e840015befeee\",\n                \"email\": \"com1@gmail.com\",\n                \"image\": \"http://res.cloudinary.com/do-an-cnpm/image/upload/v1619978750/w9xmdsqzl3oipdyy1wbp.jpg\",\n                \"phone\": \"0989402047\",\n                \"address\": \"Hà Nội\",\n                \"name\": \"Madison\"\n            }\n        ]\n    },\n    ]\n}",
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
    "url": "/api/v1/posts/{postId}/detail",
    "title": "get post by Id",
    "name": "get_post_by_Id",
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
            "type": "Object",
            "optional": false,
            "field": "post",
            "description": "<p><code> post</code> show post</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n        status: 200,\n        msg: \"Success\",\n\"post\": {\n\t\t\t\t\"_id\": \"608bc604e78f864568466972\",\n\t\t\t\t\"skill\": [\n\t\t\t\t\t\"C#\",\n\t\t\t\t\t\"Python\"\n\t\t\t\t],\n\t\t\t\t\"status\": \"WAITING\",\n\t\t\t\t\"accountId\": \"606491e7831e840015befeee\",\n\t\t\t\t\"companyId\": \"606491e8831e840015befef9\",\n\t\t\t\t\"title\": \"Recruiting Dev ops \",\n\t\t\t\t\"address\": \"Ha Noi\",\n\t\t\t\t\"salary\": \"1000 - 2000 $\",\n\t\t\t\t\"endTime\": \"2021-05-29\",\n\t\t\t\t\"description\": \"1 years experience python\",\n\t\t\t\t\"company\": [\n\t\t\t\t\t{\n\t\t\t\t\t\t\"_id\": \"606491e8831e840015befef9\",\n\t\t\t\t\t\t\"accountId\": \"606491e7831e840015befeee\",\n\t\t\t\t\t\t\"email\": \"com1@gmail.com\",\n\t\t\t\t\t\t\"image\": \"http://res.cloudinary.com/do-an-cnpm/image/upload/v1619978750/w9xmdsqzl3oipdyy1wbp.jpg\",\n\t\t\t\t\t\t\"phone\": \"0989402047\",\n\t\t\t\t\t\t\"address\": \"Hà Nội\",\n\t\t\t\t\t\t\"name\": \"Madison\"\n\t\t\t\t\t}\n\t\t\t\t]\n\t\t\t}\n    }",
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
    "url": "/api/v1/posts/company/:companyId",
    "title": "get post list of the company",
    "name": "get_post_list_of_the_company",
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
            "description": "<p><code> posts</code> show list posts</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Example",
          "content": "    HTTP/1.1 200 OK\n    {\n        status: 200,\n        msg: \"Success\",\n\t\t  \"posts\": [\n\t\t\t{\n\t\t\t\t\"skill\": [\n\t\t\t\t\t\"C#\",\n\t\t\t\t\t\"Python\"\n\t\t\t\t],\n\t\t\t\t\"_id\": \"608bc604e78f864568466972\",\n\t\t\t\t\"accountId\": \"606491e7831e840015befeee\",\n\t\t\t\t\"title\": \"Recruiting Dev ops \",\n\t\t\t\t\"address\": \"Ha Noi\",\n\t\t\t\t\"salary\": \"1000 - 2000 $\",\n\t\t\t\t\"endTime\": \"2021-05-29\",\n\t\t\t\t\"description\": \"1 years experience python\"\n\t\t\t},\n\t\t\t{\n\t\t\t\t\"skill\": [\n\t\t\t\t\t\"C#\",\n\t\t\t\t\t\"Python\"\n\t\t\t\t],\n\t\t\t\t\"_id\": \"608bc61fe78f864568466973\",\n\t\t\t\t\"accountId\": \"606491e7831e840015befeee\",\n\t\t\t\t\"title\": \"Recruiting Dev ops \",\n\t\t\t\t\"address\": \"Da Nang\",\n\t\t\t\t\"salary\": \"2000 - 3000 $\",\n\t\t\t\t\"endTime\": \"29/5/2021\",\n\t\t\t\t\"description\": \"10 years experience python\"\n\t\t\t},\n    }",
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
          "content": "HTTP/1.1 200 OK\n{\n   status: 200,\n   msg: \"Success\",\n    data : {\n        \"currentPage\": 2,\n        \"numPages\": 2,\n     posts : [\n     {\n      \"skill\": [\n          \"java\",\n          \"nodejs\"\n      ],\n      \"comment\": [],\n      \"_id\": \"601d12b5f391e21c38ea6bfe\",\n      \"companyId\": \"601d07f259e12e126c0a2af4\",\n       \"name\": \"FPT\",\n       \"address\": \"1444 nlb\",\n       \"salary\": \"1200 to 2000$\",\n       \"endTime\": \"21/3/2021\",\n       \"description\": \"nodejs >= 3 year experience\",\n        \"createdAt\": \"2021-02-05T09:41:09.446Z\"\n       },\n     ....\n    ]\n    }\n}",
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
    "type": "get",
    "url": "/api/v1/posts/{_id}/apply-list",
    "title": "list apply",
    "name": "list_apply",
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
            "field": "applies",
            "description": "<p><code>Array Objects post</code> show all list apply</p>"
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
    "version": "0.0.0",
    "filename": "F:/CNPM/BackEnd_JobIT/src/controllers/post.controller.js",
    "groupTitle": "Post"
  }
] });
