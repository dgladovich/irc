const server = require('http').Server();

const io = require('socket.io')(server);
const socketioJwt = require('socketio-jwt');

const PORT = process.env.CONTROLLER_PORT;


const SECRET = process.env.AUTH_SECRET;


const CONTROLLER_ID = process.env.AUTH_SECRET;

server.listen(PORT, (err, data) => {
    if (err) console.log(err);
    console.log(`CONTROLLER server started on port ${PORT}`);
});


class SocketConnector {
    constructor(opt) {
        this.server = opt.server;
        io.on('connection', this.onClientConnect.bind(this));
    }

    sendData(data) {
        io.emit('controller', data);
    }

    onClientConnect(socket) {
        this._bindUserEvents.call(this, socket);
        this.server.sendInitialData(socket);
    }

    _bindUserEvents(socket) {
        socket.on('disconnecting', this.onClientDisconnect.bind(this));
        socket.on('connect_failed', this.onConnectFail.bind(this));
        socket.on('controller', this.onUserData.bind(this, socket));
    }

    onClientDisconnect() {
        console.log('Client disconnected'.blue);
    }

    onConnectFail() {
        console.log('Connection Failed'.grey);
    }

    onUserData(socket, data) {
        if (data.token) {
            this.server.handleUserData(data, socket);
        }
    }

    requireAuth(socket) {
        socket.emit('auth');
    }
}
module.exports = SocketConnector;
