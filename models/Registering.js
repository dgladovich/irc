'use strict';
module.exports = (sequelize, DataTypes) => {
    const Registering = sequelize.define('Registering', {
        face_id: {
            type: DataTypes.INTEGER
        },
        def: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,
        tableName: 'smart_registering',
        freezeTableName: true
    });
    Registering.associate = function (models) {

    };
    return Registering;
};