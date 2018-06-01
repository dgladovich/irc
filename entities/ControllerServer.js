const ControllerConnector = require('./ControllerConnector');

class ControllerServer {
    constructor(opt) {
        this.broker = opt.broker;
        this.controllerConnector = new ControllerConnector({server: this});
    }

    onAlarmOrigin(alarm) {
        let message = {
            eventGroup: 'alarm',
            method: 'add',
            arguments: Object.assign(alarm, {date_confirm: null})
        };
        this.socketConnector.sendData(message)
    }

    onAlarmConfirmation(ivan_id) {
        let message = {
            eventGroup: 'alarm',
            method: 'confirm',
            arguments: Object.assign({ivan_id: ivan_id}, {})
        };
        this.socketConnector.sendData(message)
    }

    onChangeStatus(stat) {
        let message = {
            eventGroup: 'status',
            data: [Object.assign({}, stat)]
        };
        this.socketConnector.sendData(message)
    }

    onChangeValue(value) {
        let message = {
            eventGroup: 'value',
            data: [Object.assign({}, value)]
        };
        this.socketConnector.sendData(message)
    }

    onChangeSpeed(speed) {
        let message = {
            eventGroup: 'speed',
            data: {speed: speed}
        };
        this.socketConnector.sendData(message);
    }
    changeSpeed(speed){}
    startDevice(){}
    stopDevice(){}
    sendControllerInitialData(socket) {}

    handleControllerData(data) {
        let method = data.method;
        switch (method) {
            case 'confirm':
                let args = data.arguments,
                    pack = {
                        ivan_id: args.ivan_id,
                        user_id: 1
                    };
                this.onAlarmConfirmation.call(this);
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