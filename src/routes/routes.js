'use strict';

const basicController = require('./basic_routes');
const userController = require('./user_routes');
const addressBookController = require('./address_book_routes');

module.exports = [].concat(basicController, userController,addressBookController);