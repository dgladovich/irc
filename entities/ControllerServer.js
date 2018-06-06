const ControllerConnector = require('./ControllerConnector');

class ControllerServer {
    constructor(opt) {
        this.broker = opt.broker;
        this.controllerConnector = new ControllerConnector({server: this});
    }
    connect(){
        this.controllerConnector.connect();
    }

    sendControllerInitialData(){
        let queues = this.broker.getInitialQueues();
        this.controllerConnector.sendDataToController(queues);
    }

    ////////////////////////////
    //DATA FROM CONTROLLER
    ///////////////////////////

    onControllerOffline(){
        this.broker.setDevicesOffline();
    }
    onChangeStatus(data) {
       let statuses = data.data;
       statuses.forEach((status)=>{
           this.broker.handleChangedStatus(status);
       })
    }
    onChangeValue(data) {
        let values = data.data;
        values.forEach((value)=>{
            this.broker.handleChangedValue(value)
        });
    }
    onOriginAlarm(alarm) {}
    onControllerCommandExecution(command){}
    onChangeSpeed(speed){}
    onChangeMode(){}

    ////////////////////////
    //COMMANDS TO CONTROLLER
    ////////////////////////
    changeSpeed(speed){
        console.log(speed)
    }
    startController(){}
    stopController(){}
    confirmAlarm(){}


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
            default:
                console.log(`Uncorrect event type ${event}, ${data}`.red)
        }
    }
}

module.exports = ControllerServer;