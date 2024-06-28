module.exports = (sequelize, Sequelize) => {
    const Tags = sequelize.define(
        "tags",
        {
            tag_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
        },
        {
            underscored: true,
            tableName: "tags",
            timestamps: false,
        }
    );

    return Tags;
};
