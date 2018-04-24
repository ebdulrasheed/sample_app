'use strict';

const basicController = require('../controllers/basic_controller');

module.exports = [
    {
        method: 'GET',
        path: '/',
        config: {
            description: "[APP] Main landing page for simple_app",
            notes: `<b>Purpose: </b>Index for Simple_App<br>
            <b>Happy Scenerio Response: </b><br>
            <b>Other Responses: </b><br>
            `,
            tags: ["api","Base"],
            auth: false,
            handler: basicController.standardWelcomeMsg,
            plugins: {
                'hapi-swagger': {
                    order: 1
                }
            },
            validate: {
            },
        },
    }
];