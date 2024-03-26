module.exports = (sequelize, Sequelize) => {
  const File = sequelize.define(
    "file",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
        allowNull: true,
      },
      filesize: {
        type: Sequelize.INTEGER,
      },
      filepath: {
        type: Sequelize.STRING,
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
