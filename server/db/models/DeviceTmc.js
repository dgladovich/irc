'use strict';

module.exports = (sequelize, DataTypes) => {
    const DeviceTmc = sequelize.define('DeviceTmc', {
        item_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false,
        tableName: 'smart_dev_items',

    });
    DeviceTmc.associate = function (models) {
    };
    return DeviceTmc;
};
