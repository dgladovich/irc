'use strict';

module.exports = (sequelize, DataTypes) => {
    const UserGroup = sequelize.define('UserGroup', {
        name: {
            type: DataTypes.STRING,
        },
        show_service: {
            type: DataTypes.INTEGER,
        },
        use_service: {
            type: DataTypes.INTEGER,
        },
        use_controll: {
            type: DataTypes.INTEGER,
        },
        active: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false,
        tableName: 'smart_usr_grps',
        freezeTableName: true,
    });
    UserGroup.associate = function (models) {
    };
    return UserGroup;
};
