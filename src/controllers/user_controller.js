'use strict';

module.exports = class User {

    static singUpViaEmail(request, reply)
    {
        reply('Reached: ' + request.payload.first_name);
    }
}