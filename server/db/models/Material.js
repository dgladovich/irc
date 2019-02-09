 'use strict';

 module.exports = (sequelize, DataTypes) => {
     const Material = sequelize.define('Material', {
         name: {
             type: DataTypes.CHAR,
         },
         cnt: {
             type: DataTypes.INTEGER,
         },
         meas: {
             type: DataTypes.INTEGER,
         },
         price: {
             type: DataTypes.INTEGER,
         },
         curr: {
             type: DataTypes.INTEGER,
         },
         active: {
             type: DataTypes.INTEGER,
         },
     }, {
         timestamps: false,
         tableName: 'smart_materials',
         freezeTableName: true,
     });
     Material.associate = function (models) {
     };
     return Material;
 };
