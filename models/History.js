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
        tableName: 'smart_service_hists',
        freezeTableName: true
    });
    History.associate = function(models) {
    };
    return History;
};
