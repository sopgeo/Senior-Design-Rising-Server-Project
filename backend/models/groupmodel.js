module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define(
      "group",
      {
        group_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        project_id: {
          type: Sequelize.INTEGER,
        },
        hidden: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
        submitted: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        section_id: {
          type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        },
        
      },
      {
        tableName: "groups",
        timestamps: false,
      }
    );
  
    return Group;
  };
  