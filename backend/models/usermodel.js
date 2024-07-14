module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
      "user",
      {
        user_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
        },
        type: {
          type: Sequelize.ENUM("admin", "student", "sponsor", "coordinator", "advisor"),
          allowNull: false,
          defaultValue: "student"
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        group_id: {
          type: Sequelize.INTEGER,
          foreignKey: false,
          allowNull: true,
        },
        ucf_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          unique: true
        },
        photo: {
          type: Sequelize.STRING,
        },
        section: {
          type: Sequelize.STRING,
          allowNull: true,
        },

      },
      {
        underscored: true,
        tableName: "users",
        timestamps: false,
      }
    );
  
    return User;
  };
  