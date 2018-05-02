'use strict';
module.exports = (sequelize, DataTypes) => {
    const ValueStatuses = sequelize.define('ValueStatuses', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        num: {
            type: DataTypes.INTEGER
        },
        grp: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.CHAR
        },
        clr: {
            type: DataTypes.CHAR
        },
        active: {
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false,
        tableName: 'smart_stat_grp_opts',
        freezeTableName: true
    });
    ValueStatuses.associate = function(models) {
        ValueStatuses.belongsTo(models.Language, { foreignKey: 'name', targetKey: 'name' });
    };
    return ValueStatuses;
};
