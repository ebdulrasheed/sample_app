"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");

const sequelize = new Sequelize('simple_app', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
//    operatorsAliases: Sequelize.Op,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
        freezeTableName: true
    },
    logging: (str) => {
        console.log("A query is executed, to see the query, log it, in models/index.js");
        console.log(str);
    }
});

const db = {};

fs
    .readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function (file) {
        console.log(file);
        var model = sequelize["import"](path.join(__dirname, file));
        db[model.name] = model;
        console.log("Loading model: " + model.name);
    });

Object.keys(db).forEach(function (modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

//Relations Defining

//db['user'].belongsTo('address_book');
// db['user'].hasOne(db[constants.MODELS.JF_USERS_SETTINGS], { as: 'settings', foreignKey: 'user_id' });
 
// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

module.exports = db;