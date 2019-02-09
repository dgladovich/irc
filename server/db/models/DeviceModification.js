'use strict';
module.exports = (sequelize, DataTypes) => {
    const DeviceModification = sequelize.define('DeviceModification', {
        dev_type: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.CHAR
        },
        active: {
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false,
        tableName: 'smart_devs',
    });
    DeviceModification.associate = function(models) {
    };
    return DeviceModification;
};