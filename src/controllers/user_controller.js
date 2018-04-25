'use strict';

const models = require('../models/');
const AuthenticationUtility = require('../utility/authentication_utility');
const QueryUtility = require('../utility/query');
const TokenUtility = require('../utility/token_utility');
const async = require("async");



module.exports = class User {

    /**
     * Create User using email
     * @param {*} request
     * @param {*} reply 
     */
    static singUpViaEmail(request, reply)
    {
        const func = {};

        func.userExists = cb => {
            User.getUser(request.payload.email, cb)
        };

        func.addUser = (userExists,cb) => {
            if (userExists != null) {
                cb(null, false);
                return;
            }

            const query = User.addUserToDB(request.payload);            
            QueryUtility.applyCreateQuery('user', query, null, null, null, true, cb);
        }

        func.generateToken = (addUser, cb) => {
            if (addUser == false) {
                cb(null, false);
                return;
            }

            const token = TokenUtility.generateToken(addUser, "user");
            cb(null, token);
        }

        func.saveToken = function (addUser, generateToken, cb) {
            if (generateToken == false) {
                cb(null, false);
                return;
            }

            const query = {
                token: generateToken,
            };
            const options = {
                where: {
                    id: addUser.id
                }
            };
            QueryUtility.applyUpdateQuery('user', query, options, null, null, true, cb);
        };

        async.autoInject(func, function (err, results) {
            // return and if else both is used intentionally, to make the code explainable.
            if (err) {
                reply('Error Occured: ' + err);
            } else if (results.userExists != null) {
                reply('Email Exists Already');
            } else if (results.generateToken != false && results.saveToken != false) {
                //const tokenToSend = UsersController._profileResponse(results.addUser, results.generateToken);
                reply('SignUp Sucessful');
            } else {
                reply('SignUp Failed');
            }
        });
    }

    static addUserToDB(userPayload)
    {
        const query = {
            first_name: userPayload.first_name,
            last_name: userPayload.last_name,
            email: userPayload.email,
            is_deleted: 0,
        };

        query.password = AuthenticationUtility.encryptPassword(userPayload.password);

        return query;
    }

    static isUserExist(request, reply)
    {
    } 

    static updateUser(request, reply)
    {
        reply('Reached at update');
    }

    static DeleteUser(request, reply)
    {
        reply('Reached at Delte');
    }

    static getUser(email, cb)
    {
        models.user.findOne({
            where: {
                email: email,
                is_deleted: 0
            }
        }).then(
            (data) => {
                cb(null, data);
            },
            (err) => {
                cb(err);
            });
    }
}