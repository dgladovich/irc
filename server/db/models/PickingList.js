'use strict';

module.exports = (sequelize, DataTypes) => {
    const PickingList = sequelize.define('PickingList', {
        name: {
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.INTEGER,
        },


    }, {
        timestamps: false,
        tableName: 'smart_picking_lists',
        freezeTableName: true,
    });
    PickingList.associate = function (models) {
        PickingList.hasMany(models.PickingListOpt, {
            as: 'opts',
            foreignKey: 'list',
            sourceKey: 'id',
        });
    };
    return PickingList;
};
