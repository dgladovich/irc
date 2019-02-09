'use strict';

module.exports = (sequelize, DataTypes) => {
    const Alarm = sequelize.define('Alarm', {
/*        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        }, */
        ivan_id: {
            type: DataTypes.STRING,
        },
        ctrl: {
            type: DataTypes.INTEGER,
        },
        dev: {
            type: DataTypes.INTEGER,
        },
        code: {
            type: DataTypes.INTEGER,
        },
        stat: {
            type: DataTypes.INTEGER,
        },
        usr_confirm: {
            type: DataTypes.INTEGER,
        },
        date: {
            type: DataTypes.DATE,
        },
        date_confirm: {
            type: DataTypes.DATE,
        },
    }, {
        timestamps: false,
        tableName: 'smart_alrs',
        freezeTableName: true,
    });
    Alarm.associate = function (models) {
        Alarm.belongsTo(models.User, { as: 'user', foreignKey: 'usr_confirm' });
        Alarm.belongsTo(models.ErrorCode, { as: 'ecode', foreignKey: 'code' });
    };
    return Alarm;
};
