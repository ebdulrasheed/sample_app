'use strict';

const queryUtility = require('../utility/query');
const models = require("../models");


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
            models['address'].findOrCreate({
                where: {
                    address_line_1: request.payload.address_line_1,
                    address_line_2: request.payload.address_line_2,
                    city: request.payload.city,
                    user_id: request.decoded.id}})
                    .spread((address, created) =>
                    {
                        if (created){
                            console.log('Log: Address is added to database');
                            reply(address);
                        }
                        else { 
                            console.log('Log: Address already exists in database');
                            reply('Address already exists in database');
                        } 
                    });
                    
            // .spread((address, createdAddress) => {
            //     console.log('Address: ' + address);
            //     console.log('Created: ' + createdAddress);
            // });
              
            // console.log(created)
            // queryUtility.getCount(request, 'address', 'user_id')
            // .then(count => {
            //     if (count > 7) {
            //         reply('Maximum 8 addresses can be stored');
            //     } else {
            //         AddressBook._addressAlreadyExist(false, flag => {
            //             if(flag==true){
            //                 this.reply('Address record already exists');
            //                 return;
            //             }
            //             //if (count == 0) {
            //                 //this.query.zf_is_default = 1;
            //             //} else {
            //             //    this.query.zf_is_default = 0;
            //             //}
            //             //if (this.request.payload.is_saved != null) {
            //             //    this.query.zf_is_saved = this.request.payload.is_saved;
            //            // }

            //         const query = {
            //             address_line_1: userPayload.first_name,
            //             address_line_2: userPayload.last_name,
            //             city: userPayload.email,
            //             //user_id = request.decoded.id,
            //         };

            //         models.address.create(query, null)
            //         .then((data) =>
            //         {
            //             //zzb
            //             //console.log(data);
            //             if (cb == null) {
            //                 reply('Address Added');
            //             } else {
            //                 cb(null, data);
            //             }
            //         }, (err) => {
            //             if (cb == null) {
            //                 reply('Error in adding Address' + err);
            //             } else {
            //                 cb(err);
            //             }
            //         });


            //           // queryUtility.applyCreateQuery('address', tempQuery, this.reply);
            //         });                    
            //     }
            // });
        }

        static _addressAlreadyExist(request,cb){
            const query = {
                where: {
                    user_id: request.decoded.id,
                    address_line_1: request.payload.address_line_1,
                    address_line_2: request.payload.address_line_2,
                    city: request.payload.city,
                }
            };
            if(request.payload.address_line_2 != null){
                query.where.address_line_2 = {
                    [Op.eq]: request.payload.address_line_2
                }
            }
            if(user_id == true){
                query.where.id = {
                    [Op.ne]: request.payload.id
                }
            }
            // models.zf_address_books.count(query).then((data) => {
            //     cb(data != 0); // will return true if data already exists
            // });
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