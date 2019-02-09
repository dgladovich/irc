'use strict';
module.exports = (sequelize, DataTypes) => {
    const SystemError = sequelize.define('SystemError', {
        uuid: {
            type: DataTypes.STRING
        },
        created_at: {
            type: DataTypes.STRING
        },
        error_name: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'smart_system_errors',
        freezeTableName: true,
    });
    SystemError.associate = function(models) {
    };
    return SystemError;
};