const {Alarm, Queue, User, SystemError} = require('../models/index');
const Logger = require('./Logger');
const moment = require('moment');
const uuidv1 = require('uuid/v1');

class DatabaseConnector {
    constructor() {
    }

    getInitialData() {
    }

    getQueues() {
        return Alarm.findAll()
    }

    getAlarms() {
        return Queue.findAll();
    }

    getQueuesJSON() {
        return Alarm.findAll({raw: true});
    }

    getAlarmsJSON() {
        return Queue.findAll({raw: true});
    }

    getDevices() {
        return this.devices.toJSON();
    }

    getFaces() {
        return this.faces.toJSON();
    }

    addQueue(queue) {
        let uuid = uuidv1,
            q = Object.assign({uuid: uuid()}, queue);
        return Queue
            .create(q)
            .catch((e) => {
            });
    }

    addAlarm(alarm) {
        return Alarm.create(alarm);
    }

    updateQueue(uuid, values) {
        let queueUpdates = {
                execute_date: moment(),
            },
            queueUpdateConditions = {
                where: {
                    uuid: uuid
                },
                returning: true,
                plain: true
            };
        return Queue
            .update(Object.assign(queueUpdates, values), queueUpdateConditions)
            .catch((e) => {
                console.log(`Error while updating queue status`.red)
            });
    }

    addDevices() {
    }

    addFaces() {
    }

    removeQueue() {
    }

    removeAlarm() {
    }
}

module.exports = DatabaseConnector;