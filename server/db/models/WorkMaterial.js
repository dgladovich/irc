 'use strict';

 module.exports = (sequelize, DataTypes) => {
     const WorkMaterial = sequelize.define('WorkMaterial', {

         ser_work: {
             type: DataTypes.INTEGER,
         },
         material: {
             type: DataTypes.INTEGER,
         },
         cnt: {
             type: DataTypes.INTEGER,
         },
     }, {
         timestamps: false,
         tableName: 'smart_service_works_materials',
         freezeTableName: true,
     });
     WorkMaterial.associate = function (models) {
         WorkMaterial.belongsTo(models.Material, {
             as: 'mat',
             foreignKey: 'material',
         });
     };
     return WorkMaterial;
 };
