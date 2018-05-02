const server = require('http').Server();
const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');
const Radio = require('backbone.radio');
const ch = Radio.channel('controllerChannel');
const { Alarm } = require('../models');
const PORT = process.env.CONTROLLER_PORT,
    SECRET = process.env.AUTH_SECRET,
    CONTROLLER_ID = process.env.AUTH_SECRET;
server.listen(PORT, (err, data) => {
    if (err) console.log(err);
    console.log(`CONTROLLER server started on port ${PORT}`)
});

/*    io.use(socketioJwt.authorize({
secret: SECRET,
handshake: true
}));*/


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
        let sStatuses,
            controllerStatus = ch.request('initial:controller:status'),
            statuses = ch.request('initial:status'),
            alarms = ch.request('initial:alarms'),
            values = ch.request('initial:values');

        alarms.then((alrs) => {
            alrs.forEach((alarm) => {
                let alarmMessage = {
                    eventGroup: 'alarm',
                    method: 'add',
                    arguments: Object.assign({}, alarm),
                };
                console.log('sending initial alarms');
                socket.emit('controller', alarmMessage)
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
            });io.on('connection', this.onIOConnection.bind(this));
        } else {
            console.log(`Error while get initial statuses in user`.red)
        }

        setTimeout(() => {
            socket.emit('controller', {
                eventGroup: 'status',
                data: sStatuses
            });
            socket.emit('controller', {
                eventGroup: 'values',
                data: values
            });
        }, 1000);
    }

    onIOConnection(socket) {
        const address = socket.handshake.address;
        console.log(`User with ip: ${address} connected`.blue);
        this._sendInitialData(socket);
        this._subscribeUser(socket);
        this._subscribeToUserEvents(socket)


    }

    onDisconnect(reason) {
        console.log('Client disconnected'.blue)
    }

    onConnectFail() {
        console.log('Connection Failed'.grey);
    }

    onUserEvent(socket, cmnd) {
        let eventGroup = cmnd.eventGroup;
        console.log(cmnd)
        switch (eventGroup) {
            case 'controll':
                this.onUserControllEvent.call(this, cmnd);
                break;
            default:
                return;
        }
    }

    onUserControllEvent(command) {
        ch.trigger('controll:command', command)
    }

    onChangeStatus(socket, status) {
        let stat = {
            deviceId: status.id,
            stat: status.stat
        }
        socket.emit('controller', {
            eventGroup: 'status',
            data: [stat]
        })
    }

    onChangeValue(socket, value) {
        socket.emit('controller', {
            eventGroup: 'value',
            data: [value]

        })
    }

    onChangeMode(socket, mode) {
        socket.emit('controller', {
            eventGroup: 'mode',
            data: [mode]
        })
    }

    onControllExecute(socket, commands) {
        socket.emit('controller', {
            eventGroup: 'controll',
            data: [commands]


        })
    }

    onError(socket, error) {
        socket.emit('controller', {
            eventGroup: 'error',

        })
    }

    onAlarmMessage(socket, alr) {
        let method = alr.method;
        switch (method) {
            case 'confirm':
                this.onAlarmConfirmation.call(this, socket, alr)
                break;
            case 'origin':
                this.onAlarmOrigin.call(this, socket, alr);
                break;
            default:
                console.log(`Uknown type of alarm method: ${method}`.red)
                return;
        }
    }

    onAlarmConfirmation(socket, alarm) {
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
        socket.emit('controller', message);
    }

    onAlarmOrigin(socket, alarm) {
        socket.emit('controller', {
            eventGroup: 'alarm',
            method: 'add',
            arguments: Object.assign({}, alarm.data),
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

    onSystemError(socket, serror) {
        console.log(`Sending to client system errors`.red)
        socket.emit('controller', {
            eventGroup: 'serror',
        })
    }
}

module.exports = WebSocketController;