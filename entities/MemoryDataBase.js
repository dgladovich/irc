const ControllerModel = require('./models/ControllerModel');
const DevicesCollection = require('./collections/DevicesCollection');
const FacesCollection = require('./collections/FacesCollection');
const QueueCollection = require('./collections/QueueCollection');
const AlarmsCollection = require('./collections/AlarmsCollection');
const _ = require('lodash');
const config = require('../config.json');

class MemoryDataBase {
    constructor(){
        this.controller = new ControllerModel(config.ctrl);
        this.devices = new DevicesCollection(config.ctrl.devs);
        this.faces = new FacesCollection(_.toArray(config.ctrl.cfaces));
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
    getQueue(uuid){
        console.log(uuid);
        console.log(this.queues.where({uuid: uuid}));
        return this.queues.map((queue)=>{
            if(queue.get('uuid') === uuid){
                console.log('It found some ')
                return queue
            }
        });
    }
    getDevicesJSON(){
        return this.devices;
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
        this.faces.findWhere({id: +id}).set('def', value);
    }
    updateQueue(uuid, status){
        let executedQueue = this.queues.findWhere({uuid: uuid});
        if (executedQueue) {
            executedQueue.set('status', status);
        }
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