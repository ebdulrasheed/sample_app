'use strict';

module.exports = class User {

    static singUpViaEmail(request, reply)
    {
        reply('Reached: ' + request.payload.first_name);
    }

    static updateUser(request, reply)
    {
        reply('Reached at update');
    }

    static DeleteUser(request, reply)
    {
        reply('Reached at Delte');
    }

    static getUser(request, reply)
    {
        reply('Reached at Get')
    }
}