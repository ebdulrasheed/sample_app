'use strict';

const hapi = require("hapi");
const documentation = require('./src/configs/documentation');
const routes = require('./src/routes/routes');
const server = new hapi.Server();

server.connection({
    port: 3005, labels: ["api"], routes: { cors: true },
});

server.register([
    //require("hapi-auth-jwt2"),
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

server.route(routes);

// //server.auth.strategy("jwt", "jwt", "optional", {
//   //  key: config.secretKey,
//     //validateFunc: tokenUtilities.authenticateUser,
//    // verifyOptions: { algorithms: ['HS256'] },
// //});

// async function start() {
    
//         try {
//             await server.start();
//         }
//         catch (err) {
//             console.log(err);
//             process.exit(1);
//         }
    
//         console.log('Server running at:', server.info.uri);
//     };
    
// server.route(
//     {
//         method: 'GET',
//         path: '/',
//         handler: () => {
//                 return 'first page';
//         }
//     }
// );

// start();