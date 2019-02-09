 'use strict';

 module.exports = (sequelize, DataTypes) => {
     const ViewType = sequelize.define('ViewType', {
         id: {
             type: DataTypes.INTEGER,
             primaryKey: true,
         },
         name: {
             type: DataTypes.CHAR,
         },
     }, {
         timestamps: false,
         tableName: 'smart_viewtypes',
         freezeTableName: true,
     });
     ViewType.associate = function (models) {
     };
     return ViewType;
 };
