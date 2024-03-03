const dbconfig = require('../config/db.config.js');
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(dbconfig);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.todos = require('./todo.model.js')(sequelize, Sequelize);

module.exports = db;