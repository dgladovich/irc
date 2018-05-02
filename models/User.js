'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        pass: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        lang: {
            type: DataTypes.INTEGER
        },
        grp: {
            type: DataTypes.INTEGER
        },
        active: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
        tableName: 'smart_usr',
        freezeTableName: true
    });
    User.associate = function(models) {
        User.belongsTo(models.UserGroup, { as: 'group', foreignKey: 'grp' });
    };
    return User;
};
