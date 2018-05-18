'use strict';
module.exports = (sequelize, DataTypes) => {
    const Registering = sequelize.define('Registering', {
        def: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE
        }
    }, {
        timestamps: false,
        tableName: 'smart_registering',
        freezeTableName: true
    });
    Registering.associate = function(models) {

    };
    return Registering;
};