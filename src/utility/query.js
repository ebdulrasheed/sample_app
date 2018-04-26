"use strict";
const models = require("../models");
//const Op = models.Sequelize.Op;
const Op = require('sequelize').Op;

module.exports = class QueryUtility {

    /**
     * 
     * @param {*} modelName | Name of the table
     * @param {*} query  | Sequelize Query Object
     * @param {*} options | in case you want to some association etc, else null
     * @param {*} repsly | In case you want the automatic generic response after the insertion
     * @param {*} payload | Payload object 
     * @param {*} applyAdjustment | if you want to apply adjust (will add the creation and updation time and is_deleted to zero)
     * @param {*} cb 
     */
    static applyCreateQuery(modelName, query, options = null, reply = null, payload = null, applyAdjustment = true, cb = null) {
            
        query.is_deleted = 0;
        models[modelName].create(query,null)
            .then((data) => {

                //zzb
                //console.log(data);
                if (cb == null) {
                    reply('User Added');
                } else {
                    cb(null, data);
                }
            }, (err) => {
                if (cb == null) {
                    reply('Error in adding user' + err);
                } else {
                    cb(err);
                }
            });
    }


    /**
     * 
     * @param {*} modelName | Name of the table
     * @param {*} query | Update Query
     * @param {*} options | Update Options
     * @param {*} reply | In case you want to send the generic update response automatically
     * @param {*} payload 
     * @param {*} applyAdjustment | In case you want to apply some basic adjustment, is_deleted = 0 check while updating,
     * @param {*} cb |  If you want to tack the response of the query yourself 
     */
    static applyUpdateQuery(modelName, query, options, reply = null, payload = null, applyAdjustment = true, cb = null) {
        
        options.where.is_deleted = 0;
        console.log("Show Model: " + modelName);
        console.log(query);
        models[modelName].update(query, options)
            .then(data => {
                if (cb == null) {
                    reply('Profile Updated Successfully');
                } else {
                    cb(null, data);
                }
            }, err => {
                if (cb == null) {
                    reply('Error in Updating Profile' + err);
                } else {
                    cb(err);
                }
            });
    }

    /**
     * 
     * @param {*} value | Value to search for
     * @param {*} modelName | Table/model name
     * @param {*} colName | Coloumn name to search in
     * @param {*} cb | Cb to handle the response with the signature (err,count)=>{}
     */
    static getCount(value, modelName, colName, cb) {
        return models[modelName].count({
            where: {
                [colName]: {
                    [Op.eq]: value
                },
               // is_deleted: 0
            }});
        // }).then(data => {
        //     cb(null, data);
        // }, err => {
        //     cb(err);
        // });
    }
}







/// functions below are old functions, will keep using them in the above class when ever required, 


//Queries Adjustments

const adjustFindQuery = function (query) {
    return query;
};





////////////////////////////////
//////Applying Queries ////////
////////////////////////////////

const applyDeleteQuery = function (modelName, query, options, reply, payload = null, userId = null, applyAdjustment = true) {
    if (applyAdjustment == true) {
        //query
        query.is_deleted = 1;

        //options
        if (payload.id) {
            options.where = {
                id: {
                    [Op.eq]: payload.id,
                },
                is_deleted: 0,
            }
        }
    }
    models[modelName].update(query, options)
        .then((data) => {
            reply(responseUtilities.makeSuccessfullDeletionMessage());
        }, (err) => {
            reply(errorUtilities.makeAndLogError(err)).code(500);
        });
}

const applyHardDeleteQuery = function (modelName, query, options, reply, payload = null, userId = null, applyAdjustment = true) {
    options.where = {
        id: {
            [Op.eq]: payload.id,
        }
    }
    models[modelName].destroy(options)
        .then((data) => {
            reply(responseUtilities.makeSuccessfullDeletionMessage());
        }, (err) => {
            reply(errorUtilities.makeAndLogError(err)).code(500);
        });
}

const applyDeleteQueryCallback = function (modelName, query, options, cbs, cbf, payload = null, userId = null, applyAdjustment = true) {
    if (applyAdjustment == true) {
        //query
        query.is_deleted = 1;

        //options
        if (payload.id) {
            options.where = {
                id: {
                    [Op.eq]: payload.id,
                },
                is_deleted: 0,
            }
        }
    }
    models[modelName].update(query, options)
        .then(cbs, cbf);
}

const applyFindOneQuery = function (modelName, options, reply, payload = null, userId = null, applyAdjustment = true) {
    if (applyAdjustment == true) {
        options.where = {
            id: {
                [Op.eq]: payload.id,
            },
            is_deleted: 0
        };
    }
    models[modelName].findOne(options)
        .then((data) => {
            reply(responseUtilities.makeSuccessfullDataMessage(data));
        }, (err) => {
            reply(errorUtilities.makeAndLogError(err)).code(500);
        });
}

const applyFindOneQueryCallback = function (modelName, options, cbs, cbf, payload = null, userId = null, applyAdjustment = true) {
    if (applyAdjustment == true) {
        options.where = {
            id: {
                [Op.eq]: payload.id,
            },
            is_deleted: 0
        };
    }
    models[modelName].findOne(options)
        .then(cbs, cbf);
}

const applyFindAllQuery = function (modelName, query, options, reply, payload = null, userId = null, applyAdjustment = true) {
    if (applyAdjustment == true) {
        if (options.where != null) {
            options.where.is_deleted = 0;
        } else {
            options.where = {
                is_deleted: 0
            }
        }
    }
    models[modelName].findAll(options)
        .then(data => {
            reply(responseUtilities.makeSuccessfullDataMessage(data));
        }, (err) => {
            reply(errorUtilities.makeAndLogError(err)).code(500);
        });
}

const applyFindAllQueryCallback = function (modelName, query, options, reply, payload = null, userId = null, applyAdjustment = true, cbs, cbf) {
    if (applyAdjustment == true) {
        if (options.where != null) {
            options.where.is_deleted = 0;
        } else {
            options.where = {
                is_deleted: 0
            }
        }
    }
    models[modelName].findAll(options).then(cbs, cbf);
}

/*const applyFindAllQuery = function (modelName, query, options, reply, payload = null, userId = null, applyAdjustment = true) {
    models[modelName].findAll({
        where: {
            is_deleted: 0
        }
    })
        .then(data => {
            reply(responseUtilities.makeSuccessfullDataMessage(data));
        }, (err) => {
            reply(errorUtilities.makeAndLogError(err)).code(500);
        });
}*/

const applyFindAndCountAllPaginationQuery = function (modelName, options, reply, payload = null, userId = null, applyAdjustment = true) {
    models[modelName].findAndCountAll(options)
        .then((data) => {
            paginationUtilities.sendPaginationReply(reply, data);
        }, (err) => {
            reply(errorUtilities.makeAndLogError(err)).code(500);
        });
}

const applyFindAndCountAllPaginationQueryCallback = function (modelName, options, reply, cbs, cbf, payload = null, userId = null, applyAdjustment = true) {
    models[modelName].findAndCountAll(options)
        .then(cbs, cbf);
}


const getCountWithoutCurrentId = function (id, modelName, colName, objId, cb) {
    if (cb == null) {
        return models[modelName].count({
            where: {
                [colName]: {
                    [Op.eq]: id
                },
                id: {
                    [Op.ne]: objId
                },
                is_deleted: 0
            }
        });
    } else {
        return models[modelName].count({
            where: {
                [colName]: {
                    [Op.eq]: id
                },
                id: {
                    [Op.ne]: objId
                },
                is_deleted: 0
            }
        }).then((data) => {
            cb(data);
        });
    }

}