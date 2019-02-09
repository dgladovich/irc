'use strict';

module.exports = (sequelize, DataTypes) => {
    const PassportData = sequelize.define('PassportData', {
        name: {
            type: DataTypes.STRING,
        },
        fact_number: {
            type: DataTypes.INTEGER,
        },
        release_date: {
            type: DataTypes.INTEGER,
        },
        weight: {
            type: DataTypes.INTEGER,
        },
        controll_otk: {
            type: DataTypes.STRING,
        },
        perfomance: {
            type: DataTypes.STRING,
        },
    }, {
        timestamps: false,
        tableName: 'smart_pass_data',
        freezeTableName: true,
    });
    PassportData.associate = function (models) {

    };
    return PassportData;
};
