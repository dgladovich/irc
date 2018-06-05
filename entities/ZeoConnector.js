const io = require('socket.io-client');
const jwt = require('jsonwebtoken');
const {
    ZEO_SERVER,
    ZEO_SERVER_PORT,
    AUTH_SECRET,
    CONTROLLER_ID
} = process.env;
const CONTROLLER_MAC = '40:d6:3c:03:09:be';
const token = jwt.sign({id: CONTROLLER_ID, mac: CONTROLLER_MAC}, AUTH_SECRET);

class ZeoConnector {
    constructor(opt){
        this.server = opt.server;
    }
    connect(){
        this.socket = io(`${ZEO_SERVER}:${ZEO_SERVER_PORT}`, {'query': 'auth_token=' + token});
        this._bindEvents();
    }
    _bindEvents() {
        this.socket.on('connect', this.onConnected.bind(this));
        this.socket.on('disconnect', this.onDisconnect.bind(this));
        this.socket.on('controller', this.onZeoEvent.bind(this));
        this.socket.on('connect_failed', this.onConnectFail.bind(this));
    }
    onConnected() {
        this.server.sendInitialData();
    }

    onDisconnect() {
        console.log('disconnected from vasiliy'.grey)
    }

    onConnectFail() {
        console.log('Connection Failed'.grey);
    }

    onZeoEvent(cmnd) {
        let eventGroup = cmnd.eventGroup;
        switch (eventGroup) {
            case 'controll':
                this.onZeoControllEvent(cmnd);
                break;
            default:
                return;
        }
    }
    onZeoData(){}
    onConnectionError(){}
    sendData(data){
        console.log('sending shit to vasilij')
        this.socket.emit('controller', data);
    }
}

module.exports = ZeoConnector;