const net = require('net');
const Logger = require('./Logger');
const SECRET = process.env.AUTH_SECRET;
const PORT = process.env.REAL_CONTROLLER_PORT;
const ADDRESS = process.env.REAL_CONTROLLER_IP;

class ControllerConnector {
    constructor(opt){
        this.isConnected = false;
        this.server = opt.server;
        this.client = new net.createConnection();
        this.logger = new Logger();
        this._bindEvents();

    }
    connect(){
        this.logger.onControllerConnectionAttempt(PORT, ADDRESS);
        this.client.connect(PORT, ADDRESS);
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
        this.isConnected = true;
        //this.server.sendControllerInitialData();
        this.logger.onControllerConectionEstablish(PORT, ADDRESS);
    }
    onControllerDisconnected(){
        this.logger.onControllerDisconnected();
        setTimeout(this.connect.bind(this, PORT, ADDRESS), 1000);
        //this.server.onControllerOffline();
        return this.client.destroy();
    }
    onControllerConnectionError(e){
        if(this.isConnected){
            this.server.onControllerOffline();
        }
        this.isConnected = false;
        this.logger.onControllerConnectionError()
    }
    onReciveDataFromController(data){
        if (data) {
            try {
                let d = JSON.parse(data.toString());
                for(let key in d){
                    this.server.handleControllerData(d[key], key);
                }
            } catch (e) {
                this.logger.onControllerRecieveDataWithError(e);
            }
        }
        console.log('recieve data from controller'.yellow)
    }

}
module.exports = ControllerConnector;