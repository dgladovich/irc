const jwt = require('jsonwebtoken');

const SECRET = process.env.AUTH_SECRET;
const _ = require('lodash');
const SocketConnector = require('./SocketConnector');

class SocketServer {
    constructor(opt) {
        this.broker = opt.broker;
        this.socketConnector = new SocketConnector({ server: this });
        this.listeners = [];
    }

    sendAlarmOrigin(alarm) {
        const message = {
            eventGroup: 'alarm',
            method: 'add',
            arguments: Object.assign(alarm, { date_confirm: null }),
        };
        this.socketConnector.sendData(message);
    }

    sendAlarmConfirmation(ivan_id) {
        const message = {
            eventGroup: 'alarm',
            method: 'confirm',
            arguments: Object.assign({ ivan_id }, {}),
        };
        this.socketConnector.sendData(message);
    }

    sendStatus(devId, stat) {
        const status = { id: devId, stat };


const message = {
                eventGroup: 'status',
                data: [Object.assign({}, status)],
            };
        this.socketConnector.sendData(message);
    }

    sendValue(faceId, def) {
        const message = {
            eventGroup: 'value',
            data: [{ id: faceId, def }],
        };
        this.socketConnector.sendData(message);
    }

    sendSpeed(speed) {
        const message = {
            eventGroup: 'speed',
            data: { speed },
        };
        this.socketConnector.sendData(message);
    }

    sendState(devId, state) {
        const st = { id: devId, state };


const message = {
                eventGroup: 'state',
                data: [Object.assign({}, st)],
            };
        this.socketConnector.sendData(message);
    }

    sendAuthRequired() {
    }

    sendInitialData(socket) {
        const alarms = this.broker.getUserInitialAlarms();


const statuses = this.broker.getUserInitialStatuses();


const values = this.broker.getUserInitialValues();


const speed = this.broker.getInitialSpeed();


const statusPack = {
                eventGroup: 'status',
                data: statuses,
            };


const valuesPack = {
                eventGroup: 'value',
                data: values,
            };


const speedPack = {
                eventGroup: 'speed',
                data: { speed },
            };


const alarmsPack = {
                eventGroup: 'alarm',
                method: 'add',
            };
        setTimeout(() => {
            socket.emit('controller', statusPack);
            socket.emit('controller', valuesPack);
            socket.emit('controller', speedPack);
            alarms.forEach((alarm) => {
                socket.emit('controller', Object.assign(alarmsPack, { arguments: alarm }));
            });
        }, 750);
    }

    handleUserData(data, socket) {
        let pack; let userId;


const { method, token } = data;


const args = data.arguments;

        jwt.verify(token, SECRET, (err, verified) => {
            if (err) {
                console.error('Something wrong with Token');
                this.socketConnector.requireAuth(socket);
                return;
            }
            userId = verified.id;
            switch (method) {
                case 'confirm':
                    console.log('Socket server: calling alarm confirmation method');
                    pack = {
                        ivan_id: args.ivan_id,
                        user_id: userId,
                    };
                    this.broker.confirmAlarm(pack);
                    break;
                case 'repair:in':
                    console.log('Socket server: calling repair IN method');
                    const { id } = data.arguments;
                    pack = {
                      user_id: userId,
                      id,
                    };
                    this.broker.setRepairIn(pack);
                    break;
                case 'repair:out':
                    console.log('Socket server: calling repair OUT method');
                    pack = {
                        user_id: userId,
                        id,
                    };
                    this.broker.setRepairOut(pack);
                    break;
                case 'speed':
                    console.log('Socket server: calling speed change method');

                    pack = {
                        speed: args.speed,
                        user_id: userId,

                    };
                    this.broker.changeSpeed(pack);
                    break;
                case 'start':
                    console.log('Socket server: calling start method');

                    pack = {
                        user_id: userId,
                    };
                    this.broker.startController(pack);
                    break;
                case 'stop':
                    console.log('Socket server: calling stop method');
                    pack = {
                        user_id: userId,
                    };
                    this.broker.stopController(pack);
                    break;
                default:
                    console.log(`Unknown controll command method type: ${method}`.red);
            }
        });
    }

    validateData() {
    }
}

module.exports = SocketServer;
