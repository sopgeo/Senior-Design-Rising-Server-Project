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
        
      },
      {
        tableName: "section",
        timestamps: false,
      }
    );
  
    return Section;
  };