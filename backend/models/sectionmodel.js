module.exports = (sequelize, Sequelize) => {
    const Section = sequelize.define(
      "section",
      {
        section_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING
        },
        submissions_enabled: {
          type: Sequelize.BOOLEAN,
          default: true
        },
        
      },
      {
        tableName: "sections",
        timestamps: false,
      }
    );
  
    return Section;
  };