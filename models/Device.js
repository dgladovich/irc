'use strict';
module.exports = (sequelize, DataTypes) => {
    const Device = sequelize.define('Device', {
        ctrl: {
            type: DataTypes.INTEGER
        },
        ind: {
            type: DataTypes.INTEGER
        },
        typ: {
            type: DataTypes.INTEGER
        },
        lid: {
            type: DataTypes.INTEGER
        },
        repairable: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.CHAR
        },
        size: {
            type: DataTypes.INTEGER
        },
        moto: {
            type: DataTypes.INTEGER
        },
        modif: {
            type: DataTypes.INTEGER
        },
        grp: {
            type: DataTypes.INTEGER
        },
        parent: {
            type: DataTypes.INTEGER
        },
        redir: {
            type: DataTypes.INTEGER
        },
        nomi: {
            type: DataTypes.INTEGER
        },
        cur: {
            type: DataTypes.INTEGER
        },
        left: {
            type: DataTypes.INTEGER
        },
        top: {
            type: DataTypes.INTEGER
        },
        sgrp: {
            type: DataTypes.INTEGER
        },
        ecode: {
            type: DataTypes.INTEGER
        },
        idle_date: {
            type: DataTypes.DATE
        },
        stat: {
            type: DataTypes.INTEGER
        },
        active: {
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false,
        tableName: 'smart_devs',
    });
    Device.associate = function(models) {
        Device.belongsTo(models.Type, { as: 'type', foreignKey: 'typ'});
        Device.belongsTo(models.PickingList, {as: 'pickinglist', foreignKey: 'plist',});
        Device.belongsTo(models.DeviceGroup, {as: 'devicegroup', foreignKey: 'grp', targetKey: 'id'});
        Device.hasOne(models.PassportData, {as: 'passportdata', foreignKey: 'dev'});
        Device.hasMany(models.DeviceService, {as: 'service', foreignKey: 'dev'});
        Device.hasMany(models.ControllerFace, {as: 'faces', foreignKey: 'dev', sourceKey: 'id'});
    };
    return Device;
};