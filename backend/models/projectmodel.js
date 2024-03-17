module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define(
      "project",
      {
        project_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        class_id: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          allowNull: false,
        },
        group_id: {
          type: Sequelize.INTEGER,
          foreignKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        sponsor: {
          type: Sequelize.STRING,
        },
        sponsor_contact: {
          type: Sequelize.STRING,
        },
        description: {
          type: Sequelize.TEXT,
        },
        start_semester:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        start_year: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        end_semester: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        end_year: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        capacity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        documents: {
          type: Sequelize.STRING,
        },
        hidden: {
          type: Sequelize.BOOLEAN,
        },
      },
      {
        tableName: "projects",
        timestamps: false,
      }
    );
  
    return Project;
  };
  