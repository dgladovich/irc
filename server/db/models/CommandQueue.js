'use strict';
module.exports = (sequelize, DataTypes) => {
    const Queue = sequelize.define('Queue', {
        user_id: {
            type: DataTypes.INTEGER
        },
        argument: {
            type: DataTypes.INTEGER
        },
        uuid: {
            type: DataTypes.STRING
        },
        create_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        execute_date: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'pending'
        },
        method: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'smart_command_queues',
        freezeTableName: true,
    });
    Queue.associate = function(models) {
    };
    return Queue;
};