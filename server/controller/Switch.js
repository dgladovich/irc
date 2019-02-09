const ControllerRepeater = require('./ControllerRepeater');
const WebSocketController = require('./WebSocketController');
const ZeoClient = require('./ZeoClient');
require('dotenv').config();

class Switch {
    constructor(app) {
        this.controllerRepeater = new ControllerRepeater(app);
        this.zeoClient = new ZeoClient();
        this.wsController = new WebSocketController(app);
        console.log('Switch was initialized'.magenta);
    }
}

module.exports = Switch;
