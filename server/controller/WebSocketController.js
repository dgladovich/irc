const server = require('http').Server();
const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');
const Radio = require('backbone.radio');

const ch = Radio.channel('controllerChannel');
const { Alarm } = require('../models');

const PORT = process.env.CONTROLLER_PORT;


const SECRET = process.env.AUTH_SECRET;


const CONTROLLER_ID = process.env.AUTH_SECRET;
server.listen(PORT, (err, data) => {
    if (err) console.log(err);
    console.log(`CONTROLLER server started on port ${PORT}`);
});

/*    io.use(socketioJwt.authorize({
secret: SECRET,
handshake: true
})); */


class WebSocketController {
    constructor(app) {
        io.on('connection', this.onIOConnection.bind(this));
        console.log('WebSocket was initialized'.blue);
    }

    _subscribeUser(socket) {
        ch.on('status', this.onChangeStatus.bind(this, socket));
        ch.on('value', this.onChangeValue.bind(this, socket));
        ch.on('mode', this.onChangeMode.bind(this, socket));
        ch.on('alarm', this.onAlarmMessage.bind(this, socket));
        ch.on('controll', this.onControllExecute.bind(this, socket));
        ch.on('serror', this.onSystemError.bind(this, socket));
    }

    _subscribeToUserEvents(socket) {
        socket.on('disconnecting', this.onDisconnect.bind(this));
        socket.on('connect_failed', this.onConnectFail.bind(this));
        socket.on('controller', this.onUserEvent.bind(this, socket));
    }

    _sendInitialData(socket) {
        let sStatuses;


const controllerStatus = ch.request('initial:controller:status');


const statuses = ch.request('initial:status');


const alarms = ch.request('initial:alarms');


const values = ch.request('initial:values');

        alarms.then((alrs) => {
            alrs.forEach((alarm) => {
                const alarmMessage = {
                    eventGroup: 'alarm',
                    method: 'add',
                    arguments: Object.assign({}, alarm),
                };
                console.log('sending initial alarms');
                socket.emit('controller', alarmMessage);
            });
        });
        if (statuses) {
            sStatuses = statuses.map(status => ({
                    deviceId: status.id,
                    stat: status.stat,
                }));
            sStatuses.push({
                controllerId: CONTROLLER_ID,
                stat: 3,
            }); io.on('connection', this.onIOConnection.bind(this));
        } else {
            console.log('Error while get initial statuses in user'.red);
        }

        setTimeout(() => {
            socket.emit('controller', {
                eventGroup: 'status',
                data: sStatuses,
            });
            socket.emit('controller', {
                eventGroup: 'values',
                data: values,
            });
        }, 1000);
    }

    onIOConnection(socket) {
        const address = socket.handshake.address;
        console.log(`User with ip: ${address} connected`.blue);
        this._sendInitialData(socket);
        this._subscribeUser(socket);
        this._subscribeToUserEvents(socket);
    }

    onDisconnect(reason) {
        console.log('Client disconnected'.blue);
    }

    onConnectFail() {
        console.log('Connection Failed'.grey);
    }

    onUserEvent(socket, cmnd) {
        const eventGroup = cmnd.eventGroup;
        console.log(cmnd);
        switch (eventGroup) {
            case 'controll':
                this.onUserControllEvent.call(this, cmnd);
                break;
            default:
        }
    }

    onUserControllEvent(command) {
        ch.trigger('controll:command', command);
    }

    onChangeStatus(socket, status) {
        const stat = {
            deviceId: status.id,
            stat: status.stat,
        };
        socket.emit('controller', {
            eventGroup: 'status',
            data: [stat],
        });
    }

    onChangeValue(socket, value) {
        socket.emit('controller', {
            eventGroup: 'value',
            data: [value],

        });
    }

    onChangeMode(socket, mode) {
        socket.emit('controller', {
            eventGroup: 'mode',
            data: [mode],
        });
    }

    onControllExecute(socket, commands) {
        socket.emit('controller', {
            eventGroup: 'controll',
            data: [commands],


        });
    }

    onError(socket, error) {
        socket.emit('controller', {
            eventGroup: 'error',

        });
    }

    onAlarmMessage(socket, alr) {
        const method = alr.method;
        switch (method) {
            case 'confirm':
                this.onAlarmConfirmation.call(this, socket, alr);
                break;
            case 'origin':
                this.onAlarmOrigin.call(this, socket, alr);
                break;
            default:
                console.log(`Uknown type of alarm method: ${method}`.red);
        }
    }

    onAlarmConfirmation(socket, alarm) {
        const aID = alarm.data.aID;
        const usrId = alarm.data.userId;
        const ctrl = CONTROLLER_ID;
        const confDate = alarm.data.date_confirm;
        const message = {
            eventGroup: 'alarm',
            method: 'confirm',
            arguments: {
                id: aID,
                usrId,
                ctrl: +ctrl,
                confDate,
            },
        };
        socket.emit('controller', message);
    }

    onAlarmOrigin(socket, alarm) {
        socket.emit('controller', {
            eventGroup: 'alarm',
            method: 'add',
            arguments: Object.assign({}, alarm.data),
        });
    }

    onControllExecute(commands) {
        /*        this.socket.emit('controller', {
                    eventGroup: 'controll',
                    data: [commands]


                }) */
    }

    onControllerError(errors) {
        /*        this.socket.emit('controller', {
                    eventGroup: 'error',
                    data: [commands]


                }) */
    }

    onError(error) {
        this.socket.emit('controller', {
            eventGroup: 'error',

        });
    }

    onSystemError(socket, serror) {
        console.log('Sending to client system errors'.red);
        socket.emit('controller', {
            eventGroup: 'serror',
        });
    }
}

module.exports = WebSocketController;
