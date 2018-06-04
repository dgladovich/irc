'use strict';
module.exports = (sequelize, DataTypes) => {
    const History = sequelize.define('History', {
        service_id: {
            type: DataTypes.INTEGER
        },
        ctrl: {
            type: DataTypes.INTEGER
        },
        expiration_date: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.STRING
        },
        transfer: {
            type: DataTypes.INTEGER
        },
        last_service: {
            type: DataTypes.DATE
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'smart_device_service_journal',
        freezeTableName: true
    });
    History.associate = function(models) {
    };
    return History;
};
