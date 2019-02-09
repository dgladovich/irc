'use strict';

module.exports = (sequelize, DataTypes) => {
    const Controller = sequelize.define('Controller', {

        typ: {
            type: DataTypes.INTEGER,
        },
        ip: {
            type: DataTypes.STRING,
        },
        port: {
            type: DataTypes.STRING,
        },
        gid: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },
        task: {
            type: DataTypes.INTEGER,
        },
        cla: {
            type: DataTypes.INTEGER,
        },
        stat: {
            type: DataTypes.INTEGER,
        },
        work: {
            type: DataTypes.INTEGER,
        },
        active: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false,
        tableName: 'smart_ctrls',
        freezeTableName: true,
    });
    Controller.associate = function (models) {
    };
    return Controller;
};
