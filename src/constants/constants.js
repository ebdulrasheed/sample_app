'use strict';
const Joi = require("joi");

const JOI_FIRST_NAME = Joi.string().min(1).max(60).example("First Name");
const JOI_LAST_NAME = Joi.string().min(1).max(60).example("Last Name");
//const JOI_FULL_NAME = Joi.string().min(1).max(60).example("Name");
const JOI_EMAIL = Joi.string().email().example("citrusbits@cb.com");
const JOI_PASSWORD = Joi.string().min(8).max(20).regex(/^(?=.*[A-Za-z])(?=.*[^A-Za-z]).{8,20}$/).example("abc123xyz");
//const JOI_PHONE_NUMBER = Joi.string().min(5).max(20);
//const JOI_IMAGE = Joi.string().min(0).max(50);
//const JOI_FACEBOOK_ID = Joi.string().min(5).max(60);

module.exports = {
    JOI: {
        FIRST_NAME: JOI_FIRST_NAME,
        LAST_NAME: JOI_LAST_NAME,
  //      FULL_NAME: JOI_FULL_NAME,
        EMAIL: JOI_EMAIL,
        PASSWORD: JOI_PASSWORD,
  //      PHONE_NUMBER: JOI_PHONE_NUMBER,
  //      IMAGE: JOI_IMAGE,
  //      FACEBOOK_ID: JOI_FACEBOOK_ID,
    }
}