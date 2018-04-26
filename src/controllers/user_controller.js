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
           
            //console.log(addUser);
            
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
                token_no: generateToken,
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

    static loginWithEmail(request, reply) {
        const funcs = {};

        funcs.userExists = function (cb) {
            User.getUser(request.payload.email, cb);
        };

        funcs.comparePassword = function (userExists, cb) {
            if (userExists == null || userExists.password == null) {
                cb(null, false);
                return;
            }
            AuthenticationUtility.comparePassword(request.payload.password, userExists.password, cb);
        };

        funcs.generateToken = function (userExists, comparePassword, cb) {
            if (userExists == null && comparePassword == false) {
                cb(null, false);
                return;
            }
            const token = TokenUtility.generateToken(userExists, "user");
            cb(null, token);
        };

        funcs.saveToken = function (userExists, generateToken, cb) {
            if (generateToken == false) {
                cb(null, false);
                return;
            }
            const query = {
                token_no: generateToken,
            };
            const options = {
                where: {
                    id: userExists.id
                }
            }
            QueryUtility.applyUpdateQuery('user', query, options, null, null, true, cb);
        };

        async.autoInject(funcs, function (err, results) {
            // return and if else both is used intentionally, to make the code readable., 
            // as it may be un-necessary but are not causing any extra processing

            if (err) {
                reply("Error Occured:" + err);
            } else if (results.userExists == null) {
                reply('User Already Exists');
            } else if (results.comparePassword == false) {
                reply('Invalid Email or Password');
            } else if (results.generateToken != false && results.saveToken != false) {
                //const tokenToSend = UsersController._profileResponse(results.userExists, results.generateToken);
                reply('Successful Login');
            } else {
                reply("Internal Server Error while Login in").code(500);
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

    static logout(request, reply) {
        const query = {
            token_no: "",
        };
        const options = {
            where: {
                id: request.decoded.id
            }
        }
        QueryUtility.applyUpdateQuery('user', query, options, null, null, true, (err, data) => {
            if (err) {
                reply("Error Occured: " + err);
            } else {
                reply("Logout Successful");
            }
        });
    }

    static updateUser(request, reply)
    {
        reply('Reached at update');
    }

    static DeleteUser(request, reply)
    {
        reply('Reached at Delete');
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