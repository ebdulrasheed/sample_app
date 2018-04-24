'use strict';

const models = require('../models/user');
const AuthenticationUtility = require('../utility/authentication_utility');
const QueryUtility = require('../utility/query');
const TokenUtility = require('../utility/token_utility');


module.exports = class User {

    static singUpViaEmail(request, reply)
    {
        const func = {};

        func.userExists = cb => {
            User.getUser(request,payload.email, cb)
        };

        func.addUser = (userExists,cb) => {
            if (userExists != null) {
                cb(null, false);
                return;
            }

            QueryUtility.applyCreateQuery('users', query, null, null, null, true, cb);
        }

        func.generateToken = (addUser, cb) => {
            if (addUser == false) {
                cb(null, false);
                return;
            }

            const token = TokenUtility.generateToken(addUser, "user");
            cb(null, token);
        }

    }

    static addUserToDB(userPayload)
    {
        const query = {
            first_name: payload.first_name,
            last_name: payload.last_name,
            email: payload.email,
            is_deleted: 0,
        };

        query.password = AuthenticationUtility.encryptPassword(payload.password);

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

    static getUser(request, reply)
    {
        models.User.findOne({
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