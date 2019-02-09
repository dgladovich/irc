'use strict';
module.exports = (sequelize, DataTypes) => {
    const PickingListOpt = sequelize.define('PickingListOpt', {
        list: {
            type: DataTypes.INTEGER
        },
        des: {
            type: DataTypes.STRING
        },
        cnt: {
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING
        },
        marks: {
            type: DataTypes.STRING
        },
        active: {
            type: DataTypes.INTEGER
        },

    }, {
        timestamps: false,
        tableName: 'smart_picking_list_opts',
        freezeTableName: true
    });
    PickingListOpt.associate = function(models) {
    };
    return PickingListOpt;
};
