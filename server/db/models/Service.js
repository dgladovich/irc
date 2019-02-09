'use strict';

module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define('Service', {
        device_type: {
            type: DataTypes.INTEGER,
        },
        ser_num: {
            type: DataTypes.INTEGER,
        },
        ser_type: {
            type: DataTypes.INTEGER,
        },
        typ: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        _set: {
            type: DataTypes.INTEGER,
        },
        active: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false,
        tableName: 'smart_services',
        freezeTableName: true,
    });
    Service.associate = function (models) {
        Service.hasMany(models.Work, {
            as: 'works',
            foreignKey: 'service_id',
        });
    };
    return Service;
};
