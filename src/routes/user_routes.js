'use strict';

const constants = require('../constants/constants');
const UsersController = require('../controllers/user_controller');

module.exports = [

    //Sign up
    {
        method: "POST",
        path: "/users/signup",
        config: {
            description: "[APP] Create the new users from a signup",
            notes: `<b>Purpose: </b>User Signup<br>
            <b>Happy Scenerio Response: </b>User object with the authentication token<br>
            <b>Other Responses: </b><br>&#9;Duplicate Email Or Duplicate ID 
            {
                "success": false,
                "statusCode": 304,
                "message": "User already exists with this email id"
            }<br><br>
            Bad request: {
                "statusCode": 400,
                "error": "Bad Request",
                "message": "child \"password\" fails because [\"password\" length must be at least 8 characters long]",
                "validation": {
                  "source": "payload",
                  "keys": [
                    "password"
                  ]
                }
              }<br><br>
            Some Internal Crash (Handled): {
                "success": false,
                "statusCode": 500,
                "message": "connect ECONNREFUSED 1270013306"
            }<br><br>
            Server Error (not handled) : Response code will be not 200, as for all the above response code will be 200, status code will differ  
            <b>Good to know: </b><br>
            `,
            tags: ["api", "user"],
            auth: false,
            handler: UsersController.singUpViaEmail,
            plugins: {
                'hapi-swagger': {
                    order: 1
                }
            },
            validate:
            {
                payload:
                {
                    first_name: constants.JOI.FIRST_NAME.required(),
                    last_name: constants.JOI.LAST_NAME.required(),
                    email: constants.JOI.EMAIL.required(),
                    password: constants.JOI.PASSWORD.required(),
                }
            }
        }
    },
]