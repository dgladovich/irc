 'use strict';

 module.exports = (sequelize, DataTypes) => {
     const Type = sequelize.define('Type', {
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
     }, {
         timestamps: false,
         tableName: 'smart_dev_types',
         freezeTableName: true,
     });
     Type.associate = function (models) {
         Type.hasMany(models.Language, { as: 'translate', foreignKey: 'name', sourceKey: 'name' });
         Type.hasMany(models.Service, { as: 'services', foreignKey: 'typ' });
     };
     return Type;
 };
