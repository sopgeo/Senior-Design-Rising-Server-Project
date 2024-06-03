module.exports = (sequelize, Sequelize) => {
    const Tag_Map = sequelize.define(
        "tag_map",
        {
            tag_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
            project_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
            },
        },
        {
            underscored: true,
            tableName: "tag_map",
            timestamps: false,
        }
    );

    return Tag_Map;
};
