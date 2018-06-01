const io = require('socket.io-client');
const jwt = require('jsonwebtoken');
const {
    ZEO_SERVER,
    ZEO_SERVER_PORT,
    AUTH_SECRET,
    CONTROLLER_ID,
    CONTROLLER_MAC
} = process.env;
const token = jwt.sign({id: CONTROLLER_ID, mac: CONTROLLER_MAC}, AUTH_SECRET);


class ZeoConnector {
    constructor(opt){
        this.server = opt.server;
    }
    _bindEvents() {
        this.socket.on('connect', this.onConnected.bind(this));
        this.socket.on('disconnect', this.onDisconnect.bind(this));
        this.socket.on('controller', this.onZeoEvent.bind(this));
        this.socket.on('connect_failed', this.onConnectFail.bind(this));
    }
    onConnected() {
        this.server.sendInitialData();
/*        console.log('Connected to ZEO'.grey);
        let sStatuses,
            controllerStatus = ch.request('initial:controller:status'),
            statuses = ch.request('initial:status'),
            alarms = ch.request('initial:alarms'),
            values = ch.request('initial:values');

        alarms.then((alrs)=>{
            alrs.forEach((alarm)=>{
                let alarmMessage = {
                    eventGroup: 'alarm',
                    method: 'add',
                    arguments: Object.assign({}, alarm),
                };
                this.socket.emit('controller', alarmMessage)
            })
        })
        if (statuses) {
            sStatuses = statuses.map((status) => {
                return {
                    deviceId: status.id,
                    stat: status.stat
                }
            });
            sStatuses.push({
                controllerId: CONTROLLER_ID,
                stat: 3
            });
        } else {
            console.log(`Error while get initial statuses in Zeo Client`.red)
        }

        setTimeout(() => {
            this.socket.emit('controller', {
                eventGroup: 'status',
                data: sStatuses
            });
            this.socket.emit('controller', {
                eventGroup: 'values',
                data: values
            });
        }, 1000);*/
    }

    onDisconnect() {
        console.log('disconnected from vasiliy'.grey)
    }

    onConnectFail() {
        console.log('Connection Failed'.grey);
    }

    onZeoEvent(cmnd) {
        let eventGroup = cmnd.eventGroup;
        switch (eventGroup) {
            case 'controll':
                this.onZeoControllEvent(cmnd);
                break;
            default:
                return;
        }
    }
    connect(){
        this.socket = io(`${ZEO_SERVER}:${ZEO_SERVER_PORT}`, {'query': 'auth_token=' + token});
        this._bindEvents();
    }
    connectToZeo(){}
    onZeoConnected(){}
    onZeoData(){}
    onConnectionError(){}
    sendData(){}
}

module.exports = ZeoConnector;