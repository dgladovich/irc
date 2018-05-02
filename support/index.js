module.exports = function (app) {
    const server = require('http').Server(app);
    const io = require('socket.io')(server);
    const socketioJwt = require('socketio-jwt');
    const PORT = process.env.SUPPORT_PORT,
        SECRET = process.env.AUTH_SECRET;
    server.listen(PORT, (err, data) => {
        if (err) console.log(err);
        console.log(`SUPPORT server started on port ${PORT}`)
    });
    io.use(socketioJwt.authorize({
        secret: SECRET,
        handshake: true
    }));

    io.on('connection', function (socket) {
        // in socket.io 1.0
        console.log('Connected to socket user with ', socket.decoded_token.id)
    })
}

