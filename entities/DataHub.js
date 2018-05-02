const MemoryDataBase = require('./MemoryDataBase');
const DatabaseConnector = require('./DatabaseConnector');

class DataHub {
    constructor(opt) {
        this.broker = opt.broker;
        this.mdb = new MemoryDataBase();
        this.dbc = new DatabaseConnector();
    }

    loadInitialData() {
        let dataToLoad = [this.dbc.getQueuesJSON(), this.dbc.getAlarmsJSON()];
        return Promise
            .all(dataToLoad)
            .then((data) => {
                let alarms = data[0];
                let queues = data[1];
                this.mdb.addQueues(queues);
                this.mdb.addAlarms(alarms);
            })
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

    updateStatus(status) {
        let {id, stat} = status;
        this.mdb.updateDeviceStatus(id, stat);
    }

    updateValue(value) {
        let {id, def} = value;
        this.mdb.updateFaceValue(id, def);
    }

    removeAlarm(uuid) {
    }

    updateAlarm(uuid, status) {
    }

    addQueue(qm) {
        return this.dbc.addQueue(qm)
            .then((queueEntity)=>{
                let queue = queueEntity.dataValues;
                this.mdb.addQueues(queue);
            });
    }

    removeQueue() {
    }

    updateQueue(uuid, values) {
        return this.dbc.updateQueue(uuid, values).then(()=>{
            this.mdb.updateQueue(uuid, values)
        });
    }

}


module.exports = DataHub;