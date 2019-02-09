'use strict';

module.exports = (sequelize, DataTypes) => {
    const Work = sequelize.define('Work', {
        ser_num: {
            type: DataTypes.INTEGER,
        },
        des: {
            type: DataTypes.STRING,
        },
        dev: {
            type: DataTypes.INTEGER,
        },
        active: {
            type: DataTypes.INTEGER,
        },
        user_occ: {
            type: DataTypes.INTEGER,
        },
        service_id: {
            type: DataTypes.INTEGER,
        },
    }, {
        timestamps: false,
        tableName: 'smart_service_works',
        freezeTableName: true,
    });
    Work.associate = function (models) {
        Work.hasOne(models.DeviceServiceWork, { as: 'works', foreignKey: 'work_id' });
        Work.hasMany(models.WorkMaterial, { as: 'materials', foreignKey: 'ser_work' });
    };
    return Work;
};
