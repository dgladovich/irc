 'use strict';

 module.exports = (sequelize, DataTypes) => {
     const Values = sequelize.define('Values', {
         id: {
             type: DataTypes.INTEGER,
             primaryKey: true,
         },
         num: {
             type: DataTypes.INTEGER,
         },
         grp: {
             type: DataTypes.INTEGER,
         },
         name: {
             type: DataTypes.CHAR,
         },
         clr: {
             type: DataTypes.CHAR,
         },
         cla: {
             type: DataTypes.CHAR,
         },
         active: {
             type: DataTypes.INTEGER,
         },
     }, {
         timestamps: false,
         tableName: 'smart_device_service_journal',
         freezeTableName: true,
     });
     Values.associate = function (models) {
     };
     return Values;
 };
