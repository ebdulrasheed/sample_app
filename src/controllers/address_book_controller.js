'use strict';

module.exports = class AddressBook {
    
        static getAddressBook(request, reply)
        {
            reply('Reached at GET AddressBook');
        }
    
        static updateAddressBook(request, reply)
        {
            reply('Reached at update addressbook');
        }
    
        static getAddress(request, reply)
        {
            reply('Reached at get Address');
        }
    
        static createAddress(request, reply)
        {
            reply('Reached at create address');
        }

        static deleteAddress(request, reply)
        {
            reply('Reached at delete address');
        }

        static updateAddress(request, reply)
        {
            reply('Reached at Update Address');
        }
    }