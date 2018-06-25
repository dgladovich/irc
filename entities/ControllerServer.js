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
        this.broker.setControllerOffline();
    }

    onChangeStatus(data) {
        for (let key in data) {
            let id = key,
                stat = data[key];
            this.broker.handleChangedStatus({id: id, stat: stat})
        }
    }

    onChangeValue(data) {
        for (let key in data) {
            let id = key,
                def = data[key];
            this.broker.handleChangedValue({id: id, def: def})
        }
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

    onChangeState(data) {
        for (let key in data) {
            let id = key,
                state = data[key];
            this.broker.handleChangedState({id: id, state: state})
        }
    }

    ////////////////////////
    //COMMANDS TO CONTROLLER
    ////////////////////////
    _prepareCommand(uuid, method,) {

    }

    changeSpeed(speed, uuid) {
        console.log('Controller Server: sending ivan to change speed command')
        let speedCommand = {
            control: "speed",
            uuid: uuid,
            value: speed

        }
        this.controllerConnector.sendDataToController(speedCommand);
    }

    startController(uuid) {
        console.log('Controller Server: sending ivan start command')
        let startCommand = {
            control: "start",
            uuid: uuid

        }
        this.controllerConnector.sendDataToController(startCommand);
    }

    stopController(uuid) {
        console.log('Controller Server: sending ivan stop command')
        let stopCommand = {
            control: "stop",
            uuid: uuid

        }
        this.controllerConnector.sendDataToController(stopCommand);
    }

    repairIn(deviceId, uuid) {
        console.log('Controller Server: sending ivan repair IN command');
        let repairInCommand = {
            control: "repair:in",
            uuid: uuid,
            id: deviceId

        };
        this.controllerConnector.sendDataToController(repairInCommand);

    }

    repairOut(deviceId, uuid) {
        console.log('Controller Server: sending ivan repair OUT command');
        let repairInCommand = {
            control: "repair:out",
            uuid: uuid,
            id: deviceId

        };
        this.controllerConnector.sendDataToController(repairInCommand);

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
    handleControllerData(data, key) {
        switch (key) {
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
                console.log(`Uncorrect event type ${data}`.red)
        }
    }
}

module.exports = ControllerServer;