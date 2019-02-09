const ControllerConnector = require('./ControllerConnector');

class ControllerServer {
    constructor(opt) {
        this.broker = opt.broker;
        this.controllerConnector = new ControllerConnector({ server: this });
    }

    connect() {
        this.controllerConnector.connect();
    }

    sendControllerInitialData() {
        const queues = this.broker.getInitialQueues();
        this.controllerConnector.sendDataToController(queues);
    }

    // //////////////////////////
    // DATA FROM CONTROLLER
    // /////////////////////////

    onControllerOffline() {
        this.broker.setControllerOffline();
    }

    onChangeStatus(data) {
        for (const key in data) {
            const id = key;


const stat = data[key];
            this.broker.handleChangedStatus({ id, stat });
        }
    }

    onChangeValue(data) {
        for (const key in data) {
            const id = key;


const def = data[key];
            this.broker.handleChangedValue({ id, def });
        }
    }

    onOriginAlarm(alarm) {
    }

    onControllerCommandExecution(command) {
        console.log(command);
    }

    onChangeSpeed(speed) {
        console.log(speed);
    }

    onChangeMode(mode) {
        console.log(mode);
    }

    onChangeState(data) {
        for (const key in data) {
            const id = key;


const state = data[key];
            this.broker.handleChangedState({ id, state });
        }
    }

    // //////////////////////
    // COMMANDS TO CONTROLLER
    // //////////////////////
    _prepareCommand(uuid, method) {

    }

    changeSpeed(speed, uuid) {
        console.log('Controller Server: sending ivan to change speed command');
        const speedCommand = {
            control: 'speed',
            uuid,
            value: speed,

        };
        this.controllerConnector.sendDataToController(speedCommand);
    }

    startController(uuid) {
        console.log('Controller Server: sending ivan start command');
        const startCommand = {
            control: 'start',
            uuid,

        };
        this.controllerConnector.sendDataToController(startCommand);
    }

    stopController(uuid) {
        console.log('Controller Server: sending ivan stop command');
        const stopCommand = {
            control: 'stop',
            uuid,

        };
        this.controllerConnector.sendDataToController(stopCommand);
    }

    repairIn(deviceId, uuid) {
        console.log('Controller Server: sending ivan repair IN command');
        const repairInCommand = {
            control: 'repair:in',
            uuid,
            id: deviceId,

        };
        this.controllerConnector.sendDataToController(repairInCommand);
    }

    repairOut(deviceId, uuid) {
        console.log('Controller Server: sending ivan repair OUT command');
        const repairInCommand = {
            control: 'repair:out',
            uuid,
            id: deviceId,

        };
        this.controllerConnector.sendDataToController(repairInCommand);
    }

    confirmAlarm() {
        const startCommand = {
            eventGroup: 'controll',
            method: 'confirm',
            arguments: {
                uuid,
                alarmId,
            },
        };
        this.controllerConnector.sendDataToController(startCommand);
    }


    // //////////////////////
    // MAIN HANDLER
    // //////////////////////
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
            case 'moto':
                this.onChangeMoto(data);
                break;
            case 'state':
                this.onChangeState(data);
                break;
            default:
                console.log(`Uncorrect event type ${data}`.red);
        }
    }
}

module.exports = ControllerServer;
