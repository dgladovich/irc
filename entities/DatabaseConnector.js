const {Alarm, Queue, User, SystemError, Registering} = require('../models/index');
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
        return Queue.findAll({raw: true, where: { execute_date: null, user_id: null, status: 'executed' }});
    }

    getAlarmsJSON() {
        return Alarm.findAll({raw: true, where: { date_confirm: null, usr_confirm: 0 }});
    }

    getDevices() {
        return this.devices.toJSON();
    }

    getFaces() {
        return this.faces.toJSON();
    }

    addQueue(queue) {
/*        let uuid = uuidv1,
            q = Object.assign({uuid: uuid()}, queue);*/
        return Queue
            .create(queue)
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
    updateAlarm(ivan_id, user_id, date_confirm){
        return Alarm.update({ usr_confirm: user_id, date_confirm: date_confirm }, {where: { ivan_id: ivan_id }})
    }

    addDevices() {
    }

    addFaces() {
    }

    removeQueue() {
    }

    removeAlarm() {
    }
    writeValue(value){
        let valueToCreate = {
            face_id: value.id,
            def: value.def
        };
        return Registering.create(valueToCreate);
    }
}

module.exports = DatabaseConnector;