 'use strict';

 module.exports = (sequelize, DataTypes) => {
     const ValueMeasurment = sequelize.define('ValueMeasurment', {
         id: {
             type: DataTypes.INTEGER,
             primaryKey: true,
         },
         name: {
             type: DataTypes.CHAR,
         },

     }, {
         timestamps: false,
         tableName: 'smart_meas',
         freezeTableName: true,
     });
     ValueMeasurment.associate = function (models) {
         ValueMeasurment.belongsTo(models.Language, {
             as: 'translate',
             foreignKey: 'name',
             targetKey: 'name',
         });
     };
     return ValueMeasurment;
 };
