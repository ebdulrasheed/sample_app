'use strict';

const basicController = require('./basic_routes');
const userController = require('./user_routes');

module.exports = [].concat(basicController, userController);