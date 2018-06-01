const ZeoConnector = require('./ZeoConnector');

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
        console.log(speed, alarms, statuses);
    }

    onUserCommand() {
    }

    onControllerData() {
    }

    validate() {
    }
}


module.exports = ZeoClient;