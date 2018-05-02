const SocketConnector = require('./SocketConnector');

class SocketServer {
    constructor(opt) {
        this.broker = opt.broker;
        this.socketConnector = new SocketConnector({server: this});
        this.listeners = [];
    }

    onUserCommand() {
    }

    onControllerData() {
    }

    sendAlarmOrigin(alarm) {
        let message = {
            eventGroup: 'alarm',
            method: 'add',
            arguments: Object.assign(alarm, {date_confirm: null})
        };
        this.socketConnector.sendData(message)
    }

    sendAlarmConfirmation(alarm) {
        let message = {
            eventGroup: 'alarm',
            method: 'confirm',
            arguments: [Object.assign({}, stat)]
        };
        this.socketConnector.sendData(message)
    }

    sendStatus(stat) {
        let message = {
            eventGroup: 'status',
            data: [Object.assign({}, stat)]
        };
        this.socketConnector.sendData(message)
    }

    sendValue(value) {
        let message = {
            eventGroup: 'value',
            data: [Object.assign({}, value)]
        };
        this.socketConnector.sendData(message)
    }

    sendInitialData(socket) {
        let alarms = this.broker.getUserInitialAlarms(),
            statuses = this.broker.getUserInitialStatuses(),
            values = this.broker.getUserInitialValues(),
            statusPack = {
                eventGroup: 'status',
                data: statuses
            },
            valuesPack = {
                eventGroup: 'value',
                data: values
            },
            alarmsPack = {
                eventGroup: 'alarm',
                method: 'add'
            };
        setTimeout(() => {
            socket.emit('controller', statusPack);
            socket.emit('controller', valuesPack);
            alarms.forEach((alarm) => {
                socket.emit('controller', Object.assign(alarmsPack, {arguments: alarm}))
            });
        }, 750);
    }

    handleUserData(data) {
        let method = data.method;
        switch (method) {
            case 'confirm':
                let args = data.arguments,
                    pack = {
                        ivan_id: args.ivan_id,
                        user_id: 1
                    };
                this.broker.confirmAlarm(pack);
                break;
            case 'repair':
                this.broker.setRepair(data)
                break;
            case 'speed':
                this.broker.changeSpeed(data)
                break;
            case 'start':
                this.broker.startController(data)
                break;
            case 'stop':
                this.broker.stopController(data)
                break;
            default:
                console.log(`Unknown controll command method type: ${method}`.red);
                return;
        }
        this.broker.confirmAlarm();
    }

    validateData() {
    }
}

module.exports = SocketServer;