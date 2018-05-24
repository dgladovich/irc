const ControllerConnector = require('./ControllerConnector');
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
        let broker = {broker: this};
        this.controllerConnector = new ControllerConnector(broker);
        this.dh = new DataHub(broker);
        this.zeoClient = new ZeoClient(broker);
        this.socketServer = new SocketServer(broker);
        this.logger = new Logger(broker);
        this.BUFFER = [];
        this.writingBuffer = setInterval(this.uploadBuffer.bind(this), 15000)

    }

    sendControllerInitialData() {
        let queues = this.dh.getQueues();
        /*        if (queues.length > 0) {
                    queues.each(queue => {
                        this.controllerConnector.sendDataToController();
                    });
                }*/
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


    onChangeDeviceStatus(pack) {
        const statuses = pack.data;
        statuses.forEach((status) => {
            this.dh.updateStatus(status);
            this.socketServer.sendStatus(status);
        })
    }

    onChangeDeviceValue(pack) {
        const values = pack.data;
        values.forEach((value) => {
            this.dh.updateValue(value);
            this.writeValueBuffer(value)
            this.socketServer.sendValue(value);
        });
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

        let row = db.prepare('INSERT INTO `smart_registering` (`id`,`face_id`,`def`,`created_at`) VALUES (NULL,34,52375,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,77844,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,99538,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,77814,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,28088,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,33204,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,2198,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,44,27026,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,45,35353,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,73661,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,21869,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,17352,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,31083,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,77979,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,90993,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,36780,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,44,69768,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,45,35196,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,46,38926,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,47,65721,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,48,41752,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,49,79862,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,53612,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,2241,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,38778,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,9511,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,10789,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,8296,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,67773,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,17240,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,69147,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,18171,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,70137,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,99326,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,77160,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,989,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,48817,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,32155,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,7424,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,93905,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,73735,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,63592,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,11392,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,4243,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,34953,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,73532,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,78309,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,33739,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,17140,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,57358,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,18914,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,44,59948,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,30934,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,18323,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,61076,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,58894,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,80530,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,13028,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,27058,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,44,33886,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,45,39924,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,46,85229,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,47,9235,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,47096,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,89802,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,85307,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,36312,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,31992,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,85338,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,10867,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,44,5328,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,45,69129,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,46,56220,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,70248,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,40809,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,55839,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,3206,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,99926,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,72528,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,46976,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,44,97338,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,45,74729,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,46,13518,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,47,85648,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,48,93683,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,49,78204,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,27232,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,20980,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,92967,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,92399,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,9576,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,22785,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,21695,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,94665,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,21515,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,71199,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,17088,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,44,45626,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,45,93004,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,34465,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,40054,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,70983,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,93407,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,40158,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,56854,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,56702,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,44,90467,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,45,21674,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,46,1031,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,47,12433,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,48,10954,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,49,33560,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,42598,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,60165,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,53800,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,29633,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,98254,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,84951,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,55803,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,44,47059,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,45,32609,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,46,26744,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,47,74222,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,48,80434,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,49,25421,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,34787,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,77705,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,38997,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,37,6113,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,41,35681,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,42,52301,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,43,21691,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,44,51591,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,45,22596,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,46,17826,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,47,94710,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,48,10852,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,49,67666,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,50,25143,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,51,12665,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,52,64169,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,34,90268,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,35,26557,\'2018-05-24 06:37:59.000 +00:00\'),(NULL,36,60146,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,37,36879,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,41,553,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,42,8571,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,43,99391,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,44,28344,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,45,23628,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,46,88427,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,47,81900,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,48,72683,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,49,24894,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,50,15452,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,51,47203,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,52,75563,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,73,84973,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,74,88473,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,77,15847,\'2018-05-24 06:38:00.000 +00:00\'),(NULL,89,92462,\'2018-05-24 06:38:00.000 +00:00\');').run();
        this.BUFFER = [];
    }

    onOriginAlarm(pack) {
        const alarm = pack.data;

        this.logger.onRecieveAlarm();
        this.dh.addAlarm(alarm).then((alrm) => {
            this.socketServer.sendAlarmOrigin(alrm);
        });
    }


    onChangeDeviceMode(pack) {
        /*        _.each(data, (item) => {
                    this.controller.get('devices').findWhere({id: +item.id}).set('mode', +item.mode);
                })*/
    }

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

    onControllerAlarmConfirm(queue) {
        let {argument, execute_date, user_id} = queue.toJSON();
        this.dh
            .updateAlarm(argument, user_id, execute_date)
            .then((alarm) => {
                this.socketServer.sendAlarmConfirmation(argument)
            });
    }

    disconnectFromController() {
    }

    onControllerData() {
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
                    this.controllerConnector.sendDataToController(confirmationMessage);
                });
        }
    }

    setRepair() {
    }

    changeSpeed() {
    }

    startController() {
    }

    stopController() {
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