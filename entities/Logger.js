const log = require('simple-node-logger').createSimpleFileLogger({
    logFilePath: 'smart.log',
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS'
});

class Logger {
    constructor(){

    }
    onControllerConectionEstablish(port, address){
        log.log('info', 'Connection to controller established');
        console.log(`Connect to controller on address: ${address}, port: ${port}`.cyan);
    }
    onControllerDisconnected(){
        console.log(`Controller disconnected`.red);
        log.log('error', 'Controller disconnected');
    }
    onControllerConnectionError(){
        console.log(`Error while connected to controller`.red);
        log.log('error', 'Error while connected to controller');
    }
    onControllerRecieveDataWithError(e){
        console.log('Error while get data from controller'.red);
        console.log(e);
        log.log('error', 'Error while getting data from controller');
    }
    onRecieveAlarm(){
        console.log(`Recieved alarm from controller`.cyan);
        log.log('warning', 'Recieved alarm from controller');
    }
    onFailControllerExecution(){
        console.log(`Something go wrong while controller executed command: `.yellow)
        log.log('error', `Something go wrong while controller executed command: `)
    }
}

module.exports = Logger;