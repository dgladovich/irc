'use strict';
module.exports = (sequelize, DataTypes) => {
    const Journal = sequelize.define('Journal', {
        service_id: {
            type: DataTypes.INTEGER
        },
        transfer: {
            type: DataTypes.INTEGER
        },
        expiration_date: {
            type: DataTypes.DATE
        },
        status: {
            type: DataTypes.STRING
        },

    }, {
        timestamps: false,
        tableName: 'smart_device_service_journal',
        freezeTableName: true,
    });
    Journal.associate = function(models) {
        Journal.belongsTo(models.DeviceService, {as: 'service', foreignKey: 'service_id'});
    };
    return Journal;
};
