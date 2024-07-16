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
db.tags = require("./tagsmodel")(sequelize, Sequelize)
db.tagmap = require("./tagmapmodel")(sequelize, Sequelize)
db.sections = require("./sectionmodel")(sequelize, Sequelize)

db.projects.hasOne(db.groups, { foreignKey: "project_id" })
db.groups.hasMany(db.users, { foreignKey: "group_id" })
db.sections.hasMany(db.groups, { foreignKey: "section_id"})
db.groups.belongsTo(db.sections, {foreignKey: "section_id"})

db.tags.hasMany(db.tagmap, { foreignKey: "tag_id" });
db.tags.belongsToMany(db.projects, { through: db.tagmap, foreignKey: "tag_id" });
db.projects.hasMany(db.tagmap, { foreignKey: "project_id" });
db.projects.belongsToMany(db.tags, { through: db.tagmap, foreignKey: "project_id" });


module.exports = db;