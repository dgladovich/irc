'use strict';
module.exports = (sequelize, DataTypes) => {
    const ViewGroup = sequelize.define('ViewGroup', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.INTEGER
        }

    }, {
        timestamps: false,
        tableName: 'smart_viewgrps',
        freezeTableName: true
    });
    ViewGroup.associate = function(models) {
        ViewGroup.belongsTo(models.Language, {
            as: 'translate',
            foreignKey: 'name',
            targetKey: 'name'
        });
    };
    return ViewGroup;
};
