 'use strict';

 module.exports = (sequelize, DataTypes) => {
     const DeviceGroup = sequelize.define('DeviceGroup', {
         id: {
             type: DataTypes.INTEGER,
             primaryKey: true,
         },
         name: {
             type: DataTypes.STRING,
         },
         active: {
             type: DataTypes.INTEGER,
         },
         x: {
             type: DataTypes.INTEGER,
         },
         y: {
             type: DataTypes.INTEGER,
         },

     }, {
         timestamps: false,
         tableName: 'smart_dev_grps',
     });
     DeviceGroup.associate = function (models) {
         DeviceGroup.hasMany(models.Device, {
             as: 'devices',
             foreignKey: 'grp',
         });
     };
     return DeviceGroup;
 };
