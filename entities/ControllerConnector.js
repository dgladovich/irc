const net = require('net');
const Logger = require('./Logger');
const SECRET = process.env.AUTH_SECRET;
const PORT = process.env.TEST_CONTROLLER_PORT;
const ADDRESS = process.env.TEST_CONTROLLER_IP;

class ControllerConnector {
    constructor(opt){
        this.server = opt.server;
        this.client = new net.Socket();
        this.logger = new Logger();

    }
    connect(){
        this.client.connect(PORT, ADDRESS);
        this._bindEvents();
    }
    _bindEvents(){
        this.client.on('data', this.onReciveDataFromController.bind(this));
        this.client.on('connect', this.onControllerConnected.bind(this))
        this.client.on('close', this.onControllerDisconnected.bind(this));
        this.client.on('error', this.onControllerConnectionError.bind(this));
    }
    sendDataToController(data){
        this.client.write(JSON.stringify(data));
    }
    onControllerConnected(){
        this.server.sendControllerInitialData();
        this.logger.onControllerConectionEstablish(PORT, ADDRESS);
    }
    onControllerDisconnected(){
        this.logger.onControllerDisconnected();
        setTimeout(this._connect.bind(this, PORT, ADDRESS), 500);
        return this.client.destroy();
    }
    onControllerConnectionError(e){
        this.server.setDevicesOffline();
        this.logger.onControllerConnectionError()
    }
    onReciveDataFromController(data){
        if (data) {
            try {
                let d = JSON.parse(data.toString());
                this.server.handleControllerData(d);
            } catch (e) {
                this.logger.onControllerRecieveDataWithError(e);
            }
        }
        console.log('recieve data from controller'.yellow)
    }

}
module.exports = ControllerConnector;