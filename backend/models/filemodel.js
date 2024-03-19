module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define(
      "file",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        group_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        project_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        filename: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        filetype: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        filesize: {
          type: Sequelize.INTEGER,
        },
        filepath: {
          type: Sequelize.STRING,
        },
        hidden: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          defaultValue: false,
        },
        type: {
          type: Sequelize.STRING,
        },
      },
      {
        tableName: "files",
        timestamps: false,
      }
    );
  
    return File;
  };
  