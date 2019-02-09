// @flow

const Radio = require('backbone.radio');
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const Database = require('better-sqlite3');
const ControllerServer = require('./ControllerServer');
const Logger = require('./Logger');
const ZeoClient = require('./ZeoClient');
const SocketServer = require('./SocketServer');
const DataHub = require('./DataHub');

const db = new Database('smart.db');

const CC = Radio.channel('ControllerConnector');

class CentralBroker {
    constructor() {
        const broker = { broker: this };
        this.controllerServer = new ControllerServer(broker);
        this.dh = new DataHub(broker);
        this.zeoClient = new ZeoClient(broker);
        this.socketServer = new SocketServer(broker);
        this.logger = new Logger(broker);
        this.BUFFER = [];
        this.writingBuffer = setInterval(this.uploadBuffer.bind(this), 15000);
    }

    getControllerStatus() {
        return this.dh.getControllerStatus();
    }

    getInitialSpeed() {
        return this.dh.getSpeed();
    }

    getInitialQueues() {
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

    handleChangedStatus(status) {
        const { id, stat } = status;
        this.dh.updateStatus(id, stat);
        this.socketServer.sendStatus(id, stat);
        this.zeoClient.sendStatus(id, stat);
    }

    handleChangedValue(value) {
        const { id, def } = value;
        this.dh.updateValue(id, def);
        this.socketServer.sendValue(id, def);
        this.zeoClient.sendValue(id, def);
    }

    handleChangedState(data) {
        const { id, state } = data;
        this.socketServer.sendState(id, state);
        this.zeoClient.sendState(id, state);
    }

    handleChangedMode(mode) {
    }

    handleAlarmOrigin(data) {
    }

    handleExecutedCommand(data) {
    }

    onAlarmOrigin(pack) {
        const alarm = pack.data;

        this.logger.onRecieveAlarm();
        this.dh.addAlarm(alarm).then((alrm) => {
            this.socketServer.sendAlarmOrigin(alrm);
            this.zeoClient.sendAlarmOrigin(alrm);
        });
    }

    onControllerSpeedChange(queue) {
        const speed = queue.get('argument');
        this.dh.updateSpeed(speed);
        this.socketServer.sendSpeed(speed);
        this.zeoClient.sendSpeed(speed);
    }

    onControllerAlarmConfirm(queue) {
        const { argument, execute_date, user_id } = queue.toJSON();
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
        });
    }

    onChangeDeviceMode(pack) {
    }

    onControllerCommandResponse(pack) {
        if (pack.data.executed) {
            this.onControllerExecution.call(this, pack.data);
        } else {
            this.onFailControllerExecution.call(this, pack.data);
        }
    }

    onControllerExecution(data) {
        const uuid = data.uuid;
        const vals = {
            status: 'executed',
        };

        this.dh.updateQueue(uuid, vals).then((queue) => {
            this.afterExecutionAction.call(this, this.dh.getQueue(uuid));
        });
    }

    onFailControllerExecution(data) {
        this.logger.onFailControllerExecution();
    }

    sendControllerInitialData() {
        const queues = this.dh.getQueues();
    }


    setDevicesOffline() {
        this.dh.getDevices().each((device) => {
            const devId = device.get('id');


const stat = 6;
            console.log(`Setting device ${device.get('name')} offline`);
            device.set('stat', 6);
            this.socketServer.sendStatus(devId, stat);
            this.zeoClient.sendStatus(devId, stat);
        });
    }

    setControllerOffline() {
        const OFFLINE_STATUS = 6;
        this.dh.updateControllerStatus(OFFLINE_STATUS);
    }


    writeValueBuffer(value) {
        return this.BUFFER.push({
            face_id: value.id,
            def: value.def,
        });
    }

    uploadBuffer() {
        this.BUFFER.forEach((buff) => {
            const buffer = {
                face_id: buff.face_id,
                def: buff.def,
                created_at: moment().format('YYYY-MM-DD'),
            };
        });
        // this.dh.bulkWriteValue(this.BUFFER);

        this.BUFFER = [];
    }

    afterExecutionAction(queue) {
        const method = queue.get('method');
        switch (method) {
            case 'confirm':
                this.onControllerAlarmConfirm.call(this, queue);
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
        }
    }


    confirmAlarm(pack) {
        if (pack) {
            const uuid = uuidv1();


const confirmationMessage = {
                    eventGroup: 'controll',
                    method: 'confirm',
                    arguments: {
                        ivan_id: pack.ivan_id,
                        uuid,
                    },
                };


const queueMessage = {
                    method: 'confirm',
                    argument: pack.ivan_id,
                    user_id: pack.user_id,
                    uuid,
                };
            this.dh
                .addQueue(queueMessage)
                .then((data) => {
                    console.log(confirmationMessage);
                    this.controllerServer.sendDataToController(confirmationMessage);
                });
        }
    }

    setRepairIn(pack) {
        console.log('Central Broker: setting device to repair', pack);
        const uuid = uuidv1();
        const { id } = pack;
        this.controllerServer.repairIn(id, uuid);
    }

    setRepairOut(pack) {
        console.log('Central Broker: setting device out of repair', pack);
        const uuid = uuidv1();
        const { id } = pack;
        this.controllerServer.repairOut(id, uuid);
    }

    startController(pack) {
        const uuid = uuidv1();
        console.log('Central Broker: sending start command to controller');
        this.controllerServer.startController(uuid);
    }

    stopController(pack) {
        const uuid = uuidv1();
        console.log('Central Broker: sending stop command to controller');
        this.controllerServer.stopController(uuid);
    }

    changeSpeed(pack) {
        console.log('Central Broker: sending change speed command to controller');
        const uuid = uuidv1();


const { speed, user_id } = pack;


const queueMessage = {
                method: 'speed',
                argument: +speed,
                user_id: +user_id,
                uuid,
            };
        this.dh
            .addQueue(queueMessage)
            .then((data) => {
                this.controllerServer.changeSpeed(speed, uuid);
            })
            .catch((e) => {
                console.error(e);
            });
    }

    init() {
        this.dh
            .loadInitialData()
            .then(() => {
                this.controllerServer.connect();
            });
    }
}

module.exports = CentralBroker;
