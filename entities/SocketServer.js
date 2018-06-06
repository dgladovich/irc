const SocketConnector = require('./SocketConnector');
const jwt = require('jsonwebtoken');
const SECRET = process.env.AUTH_SECRET;

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

    handleUserData(data) {
        let pack,
            {method, token, arguments} = data,
            verified = jwt.verify(token, SECRET),
            {id} = verified;
        switch (method) {
            case 'confirm':
                pack = {
                    ivan_id: arguments.ivan_id,
                    user_id: id
                };
                this.broker.confirmAlarm(pack);
                break;
            case 'repair':
                this.broker.setRepair(data)
                break;
            case 'speed':
                console.log(data)
                pack = {
                    user_id: id,

                };
                this.broker.changeSpeed(pack)
                break;
            case 'start':
                pack = {
                    user_id: id
                };
                this.broker.startController(pack);
                break;
            case 'stop':
                pack = {
                    user_id: id,
                };
                this.broker.stopController(pack)
                break;
            default:
                console.log(`Unknown controll command method type: ${method}`.red);
                return;
        }
    }

    validateData() {
    }
}

module.exports = SocketServer;