const ZeoConnector = require('./ZeoConnector');
const {
    CONTROLLER_ID,
} = process.env;

class ZeoClient {
    constructor(opt) {
        this.broker = opt.broker;
        this.zeoConnector = new ZeoConnector({server: this});
        this.zeoConnector.connect();
    }

    sendInitialData() {
        let speed = this.broker.getInitialSpeed(),
            alarms = this.broker.getUserInitialAlarms(),
            statuses = this.broker.getUserInitialStatuses();
        statuses.forEach(status => {
            this.sendStatus(status);
        });
        alarms.forEach((alarm) => {
            this.sendAlarmOrigin(alarm);
        });
        this.sendSpeed(speed);
        this.sendMode();
    }

    sendStatus(devId, stat) {
        let status = {deviceId: devId, stat: stat},
            controllerStatus = this.broker.getControllerStatus,
            apiStatus = {
                eventGroup: 'status',
                data: [status],
                controller: {
                    controllerId: +CONTROLLER_ID,
                    stat
                }
            };
        this.zeoConnector.sendData(apiStatus)
    }

    sendSpeed(speed) {
        let apiSpeed = {};
        this.zeoConnector.sendData(apiSpeed);
    }

    sendMode(pack) {
        let apiMode = {};
        this.zeoConnector.sendData(apiMode);
    }

    sendAlarmOrigin(pack) {
        let apiAlarmOrigin = {};
        this.zeoConnector.sendData(apiAlarmOrigin);

    }

    sendAlarmConfirmation(pack) {
        let apiAlarmConfirmation = {};
        this.zeoConnector.sendData(apiAlarmConfirmation);
    }

    onOperatorCommand() {
    }
}

module.exports = ZeoClient;