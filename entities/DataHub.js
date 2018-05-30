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
                let queues = data[0];
                let alarms = data[1];

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

    getSpeed(){
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
    bulkWriteValue(values){
        return this.dbc.bulkWriteValues(values);
    }

    updateAlarm(ivan_id, user_id, date_confirm ) {
        return this.dbc.updateAlarm(ivan_id, user_id, date_confirm )
            .then(()=>{
                this.mdb.updateAlarm(ivan_id, user_id, date_confirm);
            })
            .catch((e)=>{})
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
    writeValue(value) {
        return this.dbc.writeValue(value);
    }
    updateQueue(uuid, values) {
        return this.dbc.updateQueue(uuid, values).then(()=>{
            this.mdb.updateQueue(uuid, values)
        });
    }
    updateSpeed(value){
        return this.mdb.updateSpeed(value);
    }

}


module.exports = DataHub;