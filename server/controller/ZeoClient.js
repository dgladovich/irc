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
const Backbone = require('backbone');
const Radio = require('backbone.radio');

const ch = Radio.channel('controllerChannel');

class ZeoClient {
    constructor(app) {
        this.api = 'default';
        this.socket = io(`${ZEO_SERVER}:${ZEO_SERVER_PORT}`, {'query': 'auth_token=' + token});
        this._bindEvents();
        this._bindSocketEvents();
        console.log('ZeoClient was initialized'.grey);
    }

    _bindEvents(socket) {
        ch.on('status', this.onChangeStatus.bind(this));
        ch.on('value', this.onChangeValue.bind(this));
        ch.on('mode', this.onChangeMode.bind(this));
        ch.on('controll', this.onControllExecute.bind(this));
        ch.on('alarm', this.onAlarmMessage.bind(this));
        ch.on('error', this.onControllerError.bind(this, socket));
        ch.on('serror', this.onSystemError.bind(this));

    }

    _bindSocketEvents() {
        this.socket.on('connect', this.onConnected.bind(this));
        this.socket.on('disconnect', this.onDisconnect.bind(this));
        this.socket.on('controller', this.onZeoEvent.bind(this));
        this.socket.on('connect_failed', this.onConnectFail.bind(this));
    }

    onConnected() {
        console.log('Connected to ZEO'.grey);
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
        }, 1000);
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

    onChangeStatus(status) {
        let deviceStat = {
            deviceId: status.id,
            stat: status.stat
        };
        this.socket.emit('controller', {
            eventGroup: 'status',
            data: [deviceStat]
        })
    }

    onZeoControllEvent(command) {
        ch.trigger('controll:command', command)
    }

    onAlarmMessage(alr) {
        let method = alr.method;
        switch (method) {
            case 'confirm':
                this.onAlarmConfirmation.call(this, alr)
                break;
            case 'origin':
                this.onAlarmOrigin.call(this, alr);
                break;
            default:
                console.log(`Uknown type of alarm method: ${method}`.red)
                return;
        }
    }

    onAlarmConfirmation(alarm) {
        console.log('Sending alarm confrirmation to ZEO'.grey)
        let aID = alarm.data.aID;
        let usrId = alarm.data.userId;
        let ctrl = CONTROLLER_ID;
        let confDate = alarm.data.date_confirm;
        let message = {
            eventGroup: 'alarm',
            method: 'confirm',
            arguments: {
                id: aID,
                usrId: usrId,
                ctrl: +ctrl,
                confDate: confDate,
            }
        }
        console.log(message);
        this.socket.emit('controller', message);
    }

    onAlarmOrigin(alarm) {
        this.socket.emit('controller', {
            eventGroup: 'alarm',
            method: 'add',
            arguments: Object.assign({}, alarm.data),
        })
    }

    onChangeValue(value) {
        this.socket.emit('controller', {
            eventGroup: 'value',
            data: [value]

        })
    }

    onChangeMode(mode) {
        this.socket.emit('controller', {
            eventGroup: 'mode',
            data: [mode]
        })
    }

    onControllExecute(commands) {
        /*        this.socket.emit('controller', {
                    eventGroup: 'controll',
                    data: [commands]


                })*/
    }

    onControllerError(errors) {
        /*        this.socket.emit('controller', {
                    eventGroup: 'error',
                    data: [commands]


                })*/
    }

    onError(error) {
        this.socket.emit('controller', {
            eventGroup: 'error',

        })
    }

    onSystemError(serror) {
        console.log(`Here I will send to ZEO diconnected errors`.red)
        /*this.socket.emit('controller', {
            eventGroup: 'serror',
            data: serror
        })*/
    }
}

module.exports = ZeoClient;

