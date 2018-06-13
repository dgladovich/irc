const SocketConnector = require('./SocketConnector');
const jwt = require('jsonwebtoken');
const SECRET = process.env.AUTH_SECRET;
const _ = require('lodash');

class SocketServer {
    constructor(opt) {
        this.broker = opt.broker;
        this.socketConnector = new SocketConnector({server: this});
        this.listeners = [];
    }

    sendAlarmOrigin(alarm) {
        let message = {
            eventGroup: 'alarm',
            method: 'add',
            arguments: Object.assign(alarm, {date_confirm: null})
        };
        this.socketConnector.sendData(message)
    }

    sendAlarmConfirmation(ivan_id) {
        let message = {
            eventGroup: 'alarm',
            method: 'confirm',
            arguments: Object.assign({ivan_id: ivan_id}, {})
        };
        this.socketConnector.sendData(message)
    }

    sendStatus(devId, stat) {
        let status = {id: devId, stat: stat},
            message = {
                eventGroup: 'status',
                data: [Object.assign({}, status)]
            };
        this.socketConnector.sendData(message)
    }

    sendValue(faceId, def) {
        let message = {
            eventGroup: 'value',
            data: [{id: faceId, def: def}]
        };
        this.socketConnector.sendData(message)
    }

    sendSpeed(speed) {
        let message = {
            eventGroup: 'speed',
            data: {speed: speed}
        };
        this.socketConnector.sendData(message);
    }
    sendAuthRequired(){}

    sendInitialData(socket) {
        let alarms = this.broker.getUserInitialAlarms(),
            statuses = this.broker.getUserInitialStatuses(),
            values = this.broker.getUserInitialValues(),
            speed = this.broker.getInitialSpeed(),
            statusPack = {
                eventGroup: 'status',
                data: statuses
            },
            valuesPack = {
                eventGroup: 'value',
                data: values
            },
            speedPack = {
                eventGroup: 'speed',
                data: {speed: speed}
            },
            alarmsPack = {
                eventGroup: 'alarm',
                method: 'add'
            };
        setTimeout(() => {
            socket.emit('controller', statusPack);
            socket.emit('controller', valuesPack);
            socket.emit('controller', speedPack);
            alarms.forEach((alarm) => {
                socket.emit('controller', Object.assign(alarmsPack, {arguments: alarm}))
            });
        }, 750);
    }

    handleUserData(data, socket) {
        let pack, userId,
            {method, token} = data,
            args = data.arguments,
            verified = jwt.verify(token, SECRET);
        if(verified){
            console.log('Everything is all right with token')
            userId = verified.id;
            switch (method) {
                case 'confirm':
                    console.log('Socket server: calling alarm confirmation method');
                    pack = {
                        ivan_id: args.ivan_id,
                        user_id: userId
                    };
                    this.broker.confirmAlarm(pack);
                    break;
                case 'repair':
                    console.log('Socket server: calling repair method');

                    this.broker.setRepair(data)
                    break;
                case 'speed':
                    console.log('Socket server: calling speed change method');

                    pack = {
                        speed: args.speed,
                        user_id: userId,

                    };
                    this.broker.changeSpeed(pack)
                    break;
                case 'start':
                    console.log('Socket server: calling start method');

                    pack = {
                        user_id: userId
                    };
                    this.broker.startController(pack);
                    break;
                case 'stop':
                    console.log('Socket server: calling stop method');
                    pack = {
                        user_id: userId,
                    };
                    this.broker.stopController(pack)
                    break;
                default:
                    console.log(`Unknown controll command method type: ${method}`.red);
                    return;
            }

        } else {
            console.error('Something wrong with Token')
            this.socketConnector.requireAuth(socket);
        }
    }

    validateData() {
    }
}

module.exports = SocketServer;