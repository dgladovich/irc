const MemoryDataBase = require('./MemoryDataBase');
const DatabaseConnector = require('./DatabaseConnector');

class DataHub {
    constructor(opt) {
        this.broker = opt.broker;
        this.mdb = new MemoryDataBase();
        this.dbc = new DatabaseConnector();
    }

    loadInitialData() {
        const dataToLoad = [this.dbc.getQueuesJSON(), this.dbc.getAlarmsJSON()];
        return Promise
            .all(dataToLoad)
            .then((data) => {
                const queues = data[0];
                const alarms = data[1];

                this.mdb.addQueues(queues);
                this.mdb.addAlarms(alarms);
            });
    }

    getAlarms() {
        return this.mdb.getAlarms();
    }

    getQueues() {
        return this.mdb.getQueues();
    }

    getQueue(uuid) {
        return this.mdb.getQueue(uuid);
    }

    getSpeed() {
        return this.mdb.getSpeed();
    }

    getDevices() {
        return this.mdb.getDevices();
    }

    getAlarmsJSON() {
        return this.mdb.getAlarmsJSON();
    }

    getValuesJSON() {
        return this.mdb.getValuesJSON();
    }

    getStatusesJSON() {
        return this.mdb.getStatusesJSON();
    }

    getControllerStatus() {
        return this.mdb.getControllerStatus();
    }

    addAlarm(alarm) {
        return this.dbc
            .addAlarm(alarm)
            .then((alarm) => {
                this.mdb.addAlarms(alarm.toJSON());
                return alarm;
            })
            .catch((e) => {
            });
    }

    updateStatus(deviceId, status) {
        this.mdb.updateDeviceStatus(deviceId, status);
    }

    updateValue(faceId, def) {
        this.mdb.updateFaceValue(faceId, def);
    }

    removeAlarm(uuid) {
    }

    bulkWriteValue(values) {
        return this.dbc.bulkWriteValues(values);
    }

    updateAlarm(ivan_id, user_id, date_confirm) {
        return this.dbc.updateAlarm(ivan_id, user_id, date_confirm)
            .then(() => {
                this.mdb.updateAlarm(ivan_id, user_id, date_confirm);
            })
            .catch((e) => {});
    }

    addQueue(qm) {
        return this.dbc.addQueue(qm)
            .then((queueEntity) => {
                const queue = queueEntity.dataValues;
                this.mdb.addQueues(queue);
            });
    }

    updateControllerStatus(stat) {
        this.mdb.updateControllerStatus(stat);
    }

    removeQueue() {
    }

    writeValue(value) {
        return this.dbc.writeValue(value);
    }

    updateQueue(uuid, values) {
        return this.dbc.updateQueue(uuid, values).then(() => {
            this.mdb.updateQueue(uuid, values);
        });
    }

    updateSpeed(value) {
        return this.mdb.updateSpeed(value);
    }
}


module.exports = DataHub;
