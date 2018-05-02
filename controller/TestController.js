require('dotenv').config('../');
const net = require('net');
const Backbone = require('backbone');
const _ = require('underscore');
const config = require('../config.json');
const PORT = 3002;
const server = net.createServer();
const uuidv1 = require('uuid/v1');
const moment = require('moment');

const ControllerModel = require('./ControllerModel');
const DevicesCollection = require('./collections/DevicesCollection');
const FacesCollection = require('./collections/FacesCollection');

const controller = new ControllerModel(config.ctrl);
const devices = new DevicesCollection(config.ctrl.devs);
const faces = new FacesCollection(_.toArray(config.ctrl.cfaces));

controller.set({
    devices: devices,
    faces: faces
});

server.on('connection', handleConnection);
server.listen(PORT, function () {
    console.log('Testing controller server listening to %j', server.address());
});
let eventGroups = [
    'status',
    'values',
    'mode',
    'alarm'
];

function generateStatuses() {
    let dlength = devices.length - 1;
    let range = _.random(0, dlength);
    let devs = devices.models.slice(0, range);
    return devs.map((device) => {
        return {
            id: device.get('id'),
            stat: _.random(1, 6)
        }
    })
}

function generateValues() {
    let flength = faces.length - 1;
    let range = _.random(0, flength);
    let facs = faces.models.slice(0, range);

    return facs.map((face) => {
        return {
            id: face.get('id'),
            def: _.random(0, 9999)
        }
    })
}

function generateMode() {
    let dlength = devices.length - 1;
    let range = _.random(0, dlength);
    let devs = devices.models.slice(0, range);
    return devs.map((device) => {
        return {
            id: device.get('id'),
            mode: _.random(1, 6)
        }
    });
}


function generateAlarm() {
    const alength = devices.length - 1;
    return {
        dev: devices.models[_.random(0, alength)].get('id'),
        code: _.random(0, 41),
        stat: _.random(0, 6),
        date: moment(),
        ivan_id: uuidv1()
    }
}

function generateData(action) {
    switch (action) {
        case 'status':
            return generateStatuses();
            break;
        case 'values':
            return generateValues();
            break;
        case 'alarm':
            return generateAlarm();
            break;
        case 'mode':
            return generateMode()
            break;
        default:
            console.log('Uncorrect event type')
    }
    ``
}

function handleConnection(conn) {
    const remoteAddress = conn.remoteAddress + ':' + conn.remotePort;
    console.log('Client connected from %s', remoteAddress);
    conn.on('data', onConnData);
    conn.once('close', onConnClose);
    conn.on('error', onConnError);
    this.gen = setInterval(() => {
        const action = eventGroups[_.random(0, 3)];
        //const action = 'status';
        const data = generateData(action);

        console.log(`Sending changed data. Action: ${action}`)
        conn.write(JSON.stringify({
            eventGroup: action,
            data: data
        }))
    }, 5000);

    function onConnData(d) {
        let body = {};
        try {
            body = JSON.parse(d.toString());
        }
        catch (e) {
            console.log(e);
        }
        console.log(body)
        let message = {eventGroup: 'controll', data: {uuid: body.arguments.uuid, executed: true}};
        setTimeout(() => {
            conn.write(JSON.stringify(message))
        }, 1000);
    }

    function onConnClose() {
        console.log('Connection from %s closed', remoteAddress);
    }

    function onConnError(err) {
        clearInterval(this.gen);
        console.log('Connection %s error: %s', remoteAddress, err.message);
    }
}