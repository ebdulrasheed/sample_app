'use strict';

const hapi = require("hapi");
const documentation = require('./src/config/documentation');
const routes = require('./src/routes/routes');
const server = new hapi.Server();
const tokenUtilities = require("./src/utility/token_utility");

server.connection({
    port: 3005, labels: ["api"], routes: { cors: true },
});

server.register([
    require("hapi-auth-jwt2"),
    require("inert"),
    require("vision"),
    {
        register: require("hapi-swagger"),
       options: documentation.swaggerOptions
    }
//    {
//        register: require('hapi-pagination'),
//        options: pagination.options,
//    }
], function (err) {
    if (err) {
                throw err;
    }
    else {
        server.start(function () {
            console.log(`Server Started at : ${server.info.uri}`);
        });
    }
});

server.auth.strategy("jwt", "jwt", "optional", {
    key: 'UfWPugFMP6PFLDPzBxuW2d76Xu5CF68sQcEUXpv3',
    validateFunc: tokenUtilities.authenticateUser,
    verifyOptions: { algorithms: ['HS256'] },
});

server.route(routes);