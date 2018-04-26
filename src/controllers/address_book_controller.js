'use strict';

const queryUtility = require('../utility/query');
const models = require("../models");
const Op = require('sequelize').Op;


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
        }

        static update(request, reply) {

            models['address'].findOne({
                where: {
                    id: request.payload.id,
                }})
                .then(count =>
                    {
                        if (count)
                        {
                            const query = {
                                address_line_1: request.payload.address_line_1,
                                address_line_2: request.payload.address_line_2,
                                city: request.payload.city
                                }

                            models['address'].update(query, {
                                where: {
                                    id: request.payload.id                                   
                                }
                            }).then((flag, data) => {
                                if (flag)
                                {
                                    console.log('Log: Address Updated');
                                    reply("Address Updated");
                                }
                                else
                                {
                                    console.log("Log: Address Updation Failed");
                                    reply("Address updation failed");
                                }
                            });
                        }
                        else
                        {
                            reply('Address does not exist');
                        }
                    });  
        }

        static delete(request, reply)
        {
            models['address'].count({
                where: {
                    id: {
                        [Op.eq]: request.payload.id
                    },
                    user_id: {
                        [Op.eq]: request.decoded.id
                    },
                }
            }).then(count => {
                if(count == 0)
                {
                    reply('No Record is available');
                }
                else if (count > 0) { // so that this.requested id is a valid address of that user and removing the default address will not effect the system
                   {
                    models['address'].destroy({
                        where: {
                            id: request.payload.id                                   
                        }})
                    .then((data) => {
                        reply('Record Deleted');
                    }, (err) => {
                        reply('Record cannot be deleted' +  err);
                    });
                   }
                } else {
                    reply('Cannot Delete');
                }
            });
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