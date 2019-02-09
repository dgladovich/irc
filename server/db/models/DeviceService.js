'use strict';

module.exports = (sequelize, DataTypes) => {
    const DeviceService = sequelize.define('DeviceService', {
        ctrl: {
            type: DataTypes.INTEGER,
        },
        dev: {
            type: DataTypes.INTEGER,
        },
        ser_num: {
            type: DataTypes.INTEGER,
        },
        _lim: {
            type: DataTypes.INTEGER,
        },
        _pre: {
            type: DataTypes.INTEGER,
        },
        service_id: {
            type: DataTypes.INTEGER,
        },
        ser_type: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false,
        tableName: 'smart_dev_servs',
    });
    DeviceService.associate = function (models) {
        DeviceService.belongsTo(models.Device, { as: 'controller', foreignKey: 'dev' });
        DeviceService.belongsTo(models.Service, { as: 'service', foreignKey: 'service_id' });
        DeviceService.hasMany(models.DeviceServiceWork, { as: 'service_work', foreignKey: 'id', sourceKey: 'service_id' });
    };
    return DeviceService;
};
