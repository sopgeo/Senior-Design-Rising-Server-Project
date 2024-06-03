const dbConfig = require("../db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER,
dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	operationsAliases: false,
});
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.projects = require("./projectmodel")(sequelize, Sequelize)
db.files = require("./filemodel")(sequelize, Sequelize)
db.users = require("./usermodel")(sequelize, Sequelize)
db.groups = require("./groupmodel")(sequelize, Sequelize)


module.exports = db;