const ControllerConnector = require('./ControllerConnector');

class ControllerServer {
    constructor(opt) {
        this.broker = opt.broker;
        this.controllerConnector = new ControllerConnector({server: this});
    }

    connect() {
        this.controllerConnector.connect();
    }

    sendControllerInitialData() {
        let queues = this.broker.getInitialQueues();
        this.controllerConnector.sendDataToController(queues);
    }

    ////////////////////////////
    //DATA FROM CONTROLLER
    ///////////////////////////

    onControllerOffline() {
        this.broker.setDevicesOffline();
    }

    onChangeStatus(data) {
        let statuses = data.data;
        statuses.forEach((status) => {
            this.broker.handleChangedStatus(status);
        })
    }

    onChangeValue(data) {
        let values = data.data;
        values.forEach((value) => {
            this.broker.handleChangedValue(value)
        });
    }

    onOriginAlarm(alarm) {
    }

    onControllerCommandExecution(command) {
        console.log(command)
    }

    onChangeSpeed(speed) {
        console.log(speed)
    }

    onChangeMode(mode) {
        console.log(mode)
    }

    ////////////////////////
    //COMMANDS TO CONTROLLER
    ////////////////////////
    _prepareCommand(uuid, method,) {

    }

    changeSpeed(speed, uuid) {
        let changeSpeedMessage = {
            eventGroup: 'controll',
            method: 'speed',
            arguments: {
                uuid: uuid
            }
        };
        this.controllerConnector.sendDataToController(changeSpeedMessage);
    }

    startController(uuid) {
        let stopCommand = {
            eventGroup: 'controll',
            method: 'stop',
            arguments: {
                uuid: uuid
            }
        };
        this.controllerConnector.sendDataToController(stopCommand);
    }

    stopController(uuid) {
        let startCommand = {
            eventGroup: 'controll',
            method: 'start',
            arguments: {
                uuid: uuid
            }
        };
        this.controllerConnector.sendDataToController(startCommand);
    }

    confirmAlarm() {
        let startCommand = {
            eventGroup: 'controll',
            method: 'confirm',
            arguments: {
                uuid: uuid,
                alarmId: alarmId
            }
        };
        this.controllerConnector.sendDataToController(startCommand);
    }


    ////////////////////////
    //MAIN HANDLER
    ////////////////////////
    handleControllerData(data) {
        const eventGroup = data.eventGroup;
        switch (eventGroup) {
            case 'status':
                this.onChangeStatus(data);
                break;
            case 'values':
                this.onChangeValue(data);
                break;
            case 'controll':
                this.onControllerCommandExecution(data);
                break;
            case 'alarm':
                this.onOriginAlarm(data);
                break;
            case 'mode':
                this.onChangeMode(data);
                break;
            case 'state':
                this.onChangeState(data);
                break;
            default:
                console.log(`Uncorrect event type ${event}, ${data}`.red)
        }
    }
}

module.exports = ControllerServer;