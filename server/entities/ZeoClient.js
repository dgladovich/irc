const ZeoConnector = require('./ZeoConnector');

const {
    CONTROLLER_ID,
} = process.env;

class ZeoClient {
    constructor(opt) {
        this.broker = opt.broker;
        this.zeoConnector = new ZeoConnector({ server: this });
        this.zeoConnector.connect();
    }

    sendInitialData() {
        const speed = this.broker.getInitialSpeed();


const alarms = this.broker.getUserInitialAlarms();


const statuses = this.broker.getUserInitialStatuses();
        statuses.forEach((status) => {
            this.sendStatus(status);
        });
        alarms.forEach((alarm) => {
            this.sendAlarmOrigin(alarm);
        });
        this.sendSpeed(speed);
        this.sendMode();
    }

    sendStatus(devId, stat) {
        const status = { deviceId: devId, stat };


const controllerStatus = this.broker.getControllerStatus;


const apiStatus = {
                eventGroup: 'status',
                data: [status],
                controller: {
                    controllerId: +CONTROLLER_ID,
                    stat,
                },
            };
        this.zeoConnector.sendData(apiStatus);
    }

    sendState(devId, state) {
        const st = { deviceId: devId, stat: state };


const controllerStatus = this.broker.getControllerStatus;


const apiStatus = {
                eventGroup: 'state',
                data: [st],
                controller: {
                    controllerId: +CONTROLLER_ID,
                    state,
                },
            };
        this.zeoConnector.sendData(apiStatus);
    }

    sendValue(faceId, def) {

    }

    sendSpeed(speed) {
        const apiSpeed = {};
        this.zeoConnector.sendData(apiSpeed);
    }

    sendMode(pack) {
        const apiMode = {};
        this.zeoConnector.sendData(apiMode);
    }

    sendAlarmOrigin(pack) {
        const apiAlarmOrigin = {};
        this.zeoConnector.sendData(apiAlarmOrigin);
    }

    sendAlarmConfirmation(pack) {
        const apiAlarmConfirmation = {};
        this.zeoConnector.sendData(apiAlarmConfirmation);
    }

    onOperatorCommand() {
    }

    handleOperatorCommand(command) {
        console.log('ZeoClient: handling operator command', command);
        // switch(){}
    }
}

module.exports = ZeoClient;
