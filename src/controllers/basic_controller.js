'use strict';

module.exports = class BasicController {

    static standardWelcomeMsg(request,reply)
    {
        reply('Welcome to site');
    }
}