const _ = require('lodash');
const ControllerModel = require('./models/ControllerModel');
const DevicesCollection = require('./collections/DevicesCollection');
const FacesCollection = require('./collections/FacesCollection');
const QueueCollection = require('./collections/QueueCollection');
const AlarmsCollection = require('./collections/AlarmsCollection');
const config = require('../config.json');

function prepareFaces(devs) {
    let faces = [];
    devs.each((d) => {
        faces = faces.concat(_.toArray(d.get('dfaces')));
    });
    return faces;
}
class MemoryDataBase {
    constructor() {
        this.speed = 0;
        this.controller = new ControllerModel(config.ctrl);
        this.devices = new DevicesCollection(config.ctrl.devs);
        this.faces = new FacesCollection(prepareFaces(this.devices));
        this.queues = new QueueCollection();
        this.alarms = new AlarmsCollection();
        this.moto = process.env.motohours || 0;
    }

    getQueues() {
        return this.queues.toJSON();
    }

    getAlarms() {
        return this.alarms.toJSON();
    }

    getDevices() {
        return this.devices;
    }

    getSpeed() {
        return this.speed;
    }

    getQueue(uuid) {
        return this.queues.findWhere({ uuid });
    }

    getDevicesJSON() {
        return this.devices;
    }

    getControllerStatus() {
        return this.controller.get('stat');
    }

    getStatusesJSON() {
        return this.devices.map(device => ({ id: device.get('id'), stat: device.get('stat') }));
    }

    getValuesJSON() {
        return this.faces.map(face => ({ id: face.get('id'), def: face.get('def') }));
    }

    getAlarmsJSON() {
        return this.alarms.toJSON();
    }

    getFaces() {
        return this.faces.toJSON();
    }

    updateDeviceStatus(id, status) {
        console.log(`Memory database: changing status, ID: ${id}, status: ${status}`);
        this.devices.findWhere({ id: +id }).set({ stat: +status });
    }

    updateFaceValue(id, value) {
        console.log(`Memory database: changing face, ID: ${id}, faceId: ${value}`);
        this.faces.findWhere({ id: +id }).set('def', +value);
    }

    updateQueue(uuid, status) {
        const executedQueue = this.queues.findWhere({ uuid });
        if (executedQueue) {
            executedQueue.set('status', status);
        }
    }

    updateSpeed(value) {
        return this.speed = value;
    }

    updateAlarm(ivan_id, user_id, date_confirm) {
        this.alarms.findWhere({ ivan_id }).set({ usr_confirm: user_id, date_confirm });
    }

    addQueues(queues) {
        this.queues.add(queues);
    }

    addAlarms(alarms) {
        this.alarms.add(alarms);
    }

    updateControllerStatus(stat) {
        this.controller.set('stat', stat);
    }

    addDevices() {}

    addFaces() {}

    removeQueue() {}

    removeAlarm() {}
}

module.exports = MemoryDataBase;
