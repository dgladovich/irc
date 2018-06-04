const ControllerServer = require('./ControllerServer');
const Logger = require('./Logger');
const ZeoClient = require('./ZeoClient');
const SocketServer = require('./SocketServer');
const Radio = require('backbone.radio');
const DataHub = require('./DataHub');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const Database = require('better-sqlite3');
const db = new Database('smart.db');

const CC = Radio.channel('ControllerConnector');

class CentralBroker {
    constructor() {
        let broker = { broker: this };
        this.controllerConnector = new ControllerServer(broker);
        this.dh = new DataHub(broker);
        this.zeoClient = new ZeoClient(broker);
        this.socketServer = new SocketServer(broker);
        this.logger = new Logger(broker);
        this.BUFFER = [];
        this.writingBuffer = setInterval(this.uploadBuffer.bind(this), 15000)

    }
    getInitialSpeed(){
        return this.dh.getSpeed();
    }
    getInitialQueues(){
        return this.dh.getQueues();
    }
    getUserInitialAlarms() {
        return this.dh.getAlarmsJSON();
    }

    getUserInitialValues() {
        return this.dh.getValuesJSON();
    }

    getUserInitialStatuses() {
        return this.dh.getStatusesJSON();
    }

    onOriginAlarm(pack) {
        const alarm = pack.data;

        this.logger.onRecieveAlarm();
        this.dh.addAlarm(alarm).then((alrm) => {
            this.socketServer.sendAlarmOrigin(alrm);
            this.zeoClient.sendAlarmOrigin(alrm);
        });
    }
    onControllerSpeedChange(queue){
        let speed = queue.get('argument');
        this.dh.updateSpeed(speed);
        this.socketServer.sendSpeed(speed);
        this.zeoClient.sendSpeed(speed);
    }

    onControllerAlarmConfirm(queue) {
        let {argument, execute_date, user_id} = queue.toJSON();
        this.dh
            .updateAlarm(argument, user_id, execute_date)
            .then((alarm) => {
                this.socketServer.sendAlarmConfirmation(argument);
                this.zeoClient.sendAlarmConfirmation(argument);
            });
    }
    onChangeDeviceStatus(pack) {
        const statuses = pack.data;
        statuses.forEach((status) => {
            this.dh.updateStatus(status);
            this.socketServer.sendStatus(status);
            this.zeoClient.sendStatus(status);
        })
    }

    onChangeDeviceValue(pack) {
        const values = pack.data;
        values.forEach((value) => {
            this.dh.updateValue(value);
            this.writeValueBuffer(value)
            this.socketServer.sendValue(value);
            this.zeoClient.sendValue(value)
        });
    }

    onChangeDeviceMode(pack) {}

    onControllerCommandResponse(pack) {
        if (pack.data.executed) {
            this.onControllerExecution.call(this, pack.data);
        } else {
            this.onFailControllerExecution.call(this, pack.data);
        }
    }

    onControllerExecution(data) {
        let uuid = data.uuid;
        let vals = {
            status: 'executed'
        };

        this.dh.updateQueue(uuid, vals).then((queue) => {
            this.afterExecutionAction.call(this, this.dh.getQueue(uuid))
        });
    }

    onFailControllerExecution(data) {
        this.logger.onFailControllerExecution();
    }

    sendControllerInitialData() {
        let queues = this.dh.getQueues();
    }

    setDevicesOffline() {
        this.dh.getDevices().each((device) => {
            console.log(`Setting device ${device.get('name')} offline`);
            device.set('stat', 6);
        })
    }
    handleControllerData(data) {
        const eventGroup = data.eventGroup;
        switch (eventGroup) {
            case 'status':
                this.onChangeDeviceStatus(data);
                break;
            case 'values':
                this.onChangeDeviceValue(data);
                break;
            case 'controll':
                this.onControllerCommandResponse(data);
                break;
            case 'alarm':
                this.onOriginAlarm(data);
                break;
            case 'mode':
                this.onChangeDeviceMode(data);
                break;
            default:
                console.log(`Uncorrect event type ${event}, ${data}`.red)
        }
    }

    writeValueBuffer(value) {
        return this.BUFFER.push({
            face_id: value.id,
            def: value.def
        });
    }

    uploadBuffer() {
        this.BUFFER.forEach((buff) => {
            let buffer = {
                face_id: buff.face_id,
                def: buff.def,
                created_at: moment().format('YYYY-MM-DD')
            };

        });
        //this.dh.bulkWriteValue(this.BUFFER);

        this.BUFFER = [];
    }
    afterExecutionAction(queue) {

        let method = queue.get('method');
        switch (method) {
            case 'confirm':
                this.onControllerAlarmConfirm.call(this, queue)
                break;
            case 'speed':
                this.onControllerSpeedChange.call(this, queue);
                break;
            case 'repair':
                this.onControllerRepairExecution.call(this, queue);
                break;
            case 'stop':
                this.onControllerStopExecution.call(this, queue);
                break;
            case 'start':
                this.onControllerStartExecution.call(this, queue);
                break;
            default:
                console.log(`Unknown type of execution command method: ${method}`.red);
                return;
        }
    }


    confirmAlarm(pack) {
        if (pack) {
            let uuid = uuidv1(),
                confirmationMessage = {
                    eventGroup: 'controll',
                    method: 'confirm',
                    arguments: {
                        ivan_id: pack.ivan_id,
                        uuid: uuid
                    }
                },
                queueMessage = {
                    method: 'confirm',
                    argument: pack.ivan_id,
                    user_id: pack.user_id,
                    uuid: uuid
                };
            this.dh
                .addQueue(queueMessage)
                .then((data) => {
                    console.log(confirmationMessage)
                    this.controllerConnector.sendDataToController(confirmationMessage);
                });
        }
    }
    setRepair() {}
    startController() {}
    stopController() {}

    changeSpeed(pack) {
        if (pack) {
            let uuid = uuidv1(),
                changeSpeedMessage = {
                    eventGroup: 'controll',
                    method: 'speed',
                    arguments: {
                        uuid: uuid
                    }
                },
                queueMessage = {
                    method: 'speed',
                    argument: +pack.arguments.speed,
                    user_id: pack.user_id,
                    uuid: uuid
                };
            this.dh
                .addQueue(queueMessage)
                .then((data) => {
                    this.controllerConnector.sendDataToController(changeSpeedMessage);
                })
                .catch((e)=>{
                    console.error(e)
                });
        }

    }
    init() {
        this.dh
            .loadInitialData()
            .then(() => {
                this.controllerConnector.connect();
            })
    }
}

module.exports = CentralBroker;