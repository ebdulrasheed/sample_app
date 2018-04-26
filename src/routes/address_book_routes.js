'use strict';

const Joi = require('joi');
const addressBookController = require('../controllers/address_book_controller');

module.exports = [
    {
        method: "POST",
        path: "/addressbook/create",
        config: {
            description: "[App] Adds the new Address book into the system",
            notes: "Add new address book to the customer account, maximum of the 8 addresses are allowed, and the very first address will be made default automatically",
            tags: ['api','addressbook'],
            auth: {
                strategy: 'jwt',
                //scope: ['USER', 'ADMIN'],
            },
            handler: addressBookController.createAddress,
            plugins: {},
            validate: {
                payload: {
                    address_line_1: Joi.string().min(1).max(512).required().example("Address Line 1"),
                    address_line_2: Joi.string().min(1).max(512).example("Address Line 2"), //not required
                    city: Joi.string().min(1).max(60).required().example("city"),
                }
            }
        }
    }
]