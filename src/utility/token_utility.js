"use strict";
const models = require("../models");
const jwt = require('jsonwebtoken');

module.exports = class TokenUtility {
    static makeTokenQueryData(decoded, request) {
        const options = {
            where: {
                id: decoded.id,
                is_deleted: 0,
                auth_token: request.headers.authorization,
            }
        }
        return options;
    }

    static authenticateUser(decoded, request, callback) {
        let options = TokenUtility.makeTokenQueryData(decoded, request);
        let modelName = "user";
        request.decoded = {
            id: decoded.id,
        }
        models[modelName].findOne(options)
            .then(data => {
                console.log("User Found: " +  (data != null));
                callback(null, data != null);
            }, callback);
    };

    static generateToken(input, category) {
        return jwt.sign({
                id: input.id
            },
            'UfWPugFMP6PFLDPzBxuW2d76Xu5CF68sQcEUXpv3', {
                expiresIn: '40d'
            },
            { algorithm: 'RS256'}
            //config.secretKey, {
            //    expiresIn: config.tokenExpiresIn
            //}
        );
    }
}