'use strict';
module.exports = (sequelize, DataTypes) => {
    const TMC = sequelize.define('TMC', {
        desc: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        },
        service_id: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
        tableName: 'smart_device_service_journal',
        freezeTableName: true
    });
    TMC.associate = function(models) {
    };
    return TMC;
};
