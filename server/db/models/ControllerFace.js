'use strict';
module.exports = (sequelize, DataTypes) => {
    const ControllerFace = sequelize.define('ControllerFace', {
        ctrl: {
            type: DataTypes.INTEGER
        },
        dev: {
            type: DataTypes.INTEGER
        },
        struc: {
            type: DataTypes.INTEGER
        },
        keyn:{
            type: DataTypes.STRING
        },
        name:{
            type: DataTypes.STRING
        },
        meas:{
            type: DataTypes.INTEGER
        },
        viewgrp:{
            type: DataTypes.INTEGER
        },
        viewtype:{
            type: DataTypes.INTEGER
        },
        stat_grp:{
            type: DataTypes.INTEGER
        },
        def:{
            type: DataTypes.INTEGER
        },
        lim_alert:{
            type: DataTypes.INTEGER
        },
        lim_warning:{
            type: DataTypes.INTEGER
        },
        lim_danger:{
            type: DataTypes.INTEGER
        },
        min_val:{
            type: DataTypes.INTEGER
        },
        max_val:{
            type: DataTypes.INTEGER
        },
        orde:{
            type: DataTypes.INTEGER
        },
        invert:{
            type: DataTypes.INTEGER
        },
        show_scat:{
            type: DataTypes.INTEGER
        },
        active:{
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
        tableName: 'smart_ctrl_faces'
    });
    ControllerFace.associate = function(models) {
        ControllerFace.belongsTo(models.ValueMeasurment, {as: 'measure', foreignKey: 'meas', targetKey: 'id'});
    };
    return ControllerFace;
};