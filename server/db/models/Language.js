 'use strict';

 module.exports = (sequelize, DataTypes) => {
     const Language = sequelize.define('Language', {
         name: {
             type: DataTypes.STRING,
         },
         ukr: {
             type: DataTypes.STRING,
         },
         eng: {
             type: DataTypes.STRING,
         },
         rus: {
             type: DataTypes.STRING,
         },

     }, {
         timestamps: false,
         tableName: 'smart_lang_routes',
         freezeTableName: true,
     });
     Language.associate = function (models) {

     };
     return Language;
 };
