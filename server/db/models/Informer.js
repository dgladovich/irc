'use strict';

module.exports = (sequelize, DataTypes) => {
    const Informer = sequelize.define('Informer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        text: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false,
        tableName: 'smart_informer',
        freezeTableName: true,
    });
    Informer.associate = function (models) {
    };
    return Informer;
};
