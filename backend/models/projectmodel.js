module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define(
      "project",
      {
        project_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
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
        end_semester: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        end_year: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        documents: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: "projects",
        timestamps: false,
      }
    );
  
    return Project;
  };
  