 'use strict';
 module.exports = (sequelize, DataTypes) => {
     const DeviceValue = sequelize.define('DeviceValue', {
         id: {
             type: DataTypes.INTEGER,
             primaryKey: true
         },
         struc: {
             type: DataTypes.INTEGER
         },
         ind: {
             type: DataTypes.INTEGER
         },
         typ: {
             type: DataTypes.INTEGER
         },
         keyn: {
             type: DataTypes.CHAR
         },
         name: {
             type: DataTypes.CHAR
         },
         def: {
             type: DataTypes.CHAR
         },
         lim_alert: {
             type: DataTypes.CHAR
         },
         lim_warning: {
             type: DataTypes.CHAR
         },
         lim_danger: {
             type: DataTypes.CHAR
         },
         lim_struc: {
             type: DataTypes.INTEGER
         },
         active: {
             type: DataTypes.INTEGER
         },
     }, {
         timestamps: false,
         tableName: 'smart_struc_opt'
     });
     DeviceValue.associate = function(models) {
     };
     return DeviceValue;
 };
