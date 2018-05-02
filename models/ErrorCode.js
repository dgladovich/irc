'use strict';
module.exports = (sequelize, DataTypes) => {
    const ErrorCode = sequelize.define('ErrorCode', {
        sie_id: DataTypes.INTEGER,
        typ: DataTypes.INTEGER,
        msg: DataTypes.STRING,
        reason: DataTypes.STRING,
        solution: DataTypes.STRING
    }, {
        timestamps: false,
        tableName: 'smart_errcodes'
    });
    ErrorCode.associate = function(models) {
    };
    return ErrorCode;
};
