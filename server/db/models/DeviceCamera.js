'use strict';
module.exports = (sequelize, DataTypes) => {
    const DeviceCamera = sequelize.define('DeviceCamera', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ip: {
            type: DataTypes.STRING
        },
        dev: {
            type: DataTypes.INTEGER
        },
        pos: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'smart_dev_cameras'
    });
    DeviceCamera.associate = function(models) {
    };
    return DeviceCamera;
};