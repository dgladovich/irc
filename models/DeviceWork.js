'use strict';
module.exports = (sequelize, DataTypes) => {
    const DeviceServiceWork = sequelize.define('DeviceServiceWork', {
        ctrl: {
            type: DataTypes.INTEGER
        },
        dev: {
            type: DataTypes.INTEGER
        },
        typ: {
            type: DataTypes.INTEGER
        },
        ser_num: {
            type: DataTypes.INTEGER
        },
        work: {
            type: DataTypes.INTEGER
        },
        done: {
            type: DataTypes.INTEGER
        },
        service_id: {
            type: DataTypes.INTEGER
        },
        user_occ: {
            type: DataTypes.INTEGER
        },
        perform: {
            type: DataTypes.INTEGER
        },
        work_id: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
        tableName: 'smart_dev_serworks'
    });
    DeviceServiceWork.associate = function (models) {
        DeviceServiceWork.belongsTo(models.Work, {
            as: 'works',
            foreignKey: 'work_id'
        });
        DeviceServiceWork.belongsTo(models.Work, {
            as: 'description',
            foreignKey: 'work_id'
        });
        DeviceServiceWork.belongsTo(models.Type, {
            as: 'devicetype',
            foreignKey: 'typ'
        });
        DeviceServiceWork.belongsTo(models.Device, {
            as: 'controller',
            foreignKey: 'dev'
        });
        DeviceServiceWork.belongsTo(models.DeviceService, {
            as: 'devser',
            foreignKey: 'service_id'
        });

    };
    return DeviceServiceWork;
};