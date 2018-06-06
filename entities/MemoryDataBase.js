const ControllerModel = require('./models/ControllerModel');
const DevicesCollection = require('./collections/DevicesCollection');
const FacesCollection = require('./collections/FacesCollection');
const QueueCollection = require('./collections/QueueCollection');
const AlarmsCollection = require('./collections/AlarmsCollection');
const _ = require('lodash');
const config = require('../config.json');

function prepareFaces(devs){
    let faces = [];
    devs.each((d)=>{
        faces = faces.concat(_.toArray(d.get('dfaces')))
    });
    return faces;
}
class MemoryDataBase {
    constructor(){
        this.speed = 0;
        this.controller = new ControllerModel(config.ctrl);
        this.devices = new DevicesCollection(config.ctrl.devs);
        this.faces = new FacesCollection(prepareFaces(this.devices));
        this.queues = new QueueCollection();
        this.alarms = new AlarmsCollection();
    }
    getQueues(){
        return this.queues.toJSON();
    }
    getAlarms(){
        return this.alarms.toJSON();
    }
    getDevices(){
        return this.devices;
    }
    getSpeed(){
        return this.speed;
    }
    getQueue(uuid){
        return this.queues.findWhere({uuid: uuid});
    }
    getDevicesJSON(){
        return this.devices;
    }
    getControllerStatus(){
        return this.controller.get('stat');
    }
    getStatusesJSON(){
        return this.devices.map((device) => { return  {id: device.get('id'), stat: device.get('stat')}});
    }
    getValuesJSON(){
        return this.faces.map((face) => { return  { id: face.get('id'), def: face.get('def') }});
    }
    getAlarmsJSON(){
        return this.alarms.toJSON();
    }
    getFaces(){
        return this.faces.toJSON();
    }
    updateDeviceStatus(id, status){
        this.devices.findWhere({id: +id}).set({stat: +status});
    }
    updateFaceValue(id, value){
        this.faces.findWhere({id: +id}).set('def', +value);
    }
    updateQueue(uuid, status){
        let executedQueue = this.queues.findWhere({uuid: uuid});
        if (executedQueue) {
            executedQueue.set('status', status);
        }
    }
    updateSpeed(value){
        return this.speed = value;
    }
    updateAlarm(ivan_id, user_id, date_confirm){
        this.alarms.findWhere({ivan_id: ivan_id}).set({usr_confirm: user_id, date_confirm: date_confirm})
    }
    addQueues(queues){
        this.queues.add(queues);
    }
    addAlarms(alarms){
        this.alarms.add(alarms);
    }
    addDevices(){}
    addFaces(){}
    removeQueue(){}
    removeAlarm(){}

}

module.exports = MemoryDataBase;