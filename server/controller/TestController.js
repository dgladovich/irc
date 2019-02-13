require('dotenv').config('../');
const net = require('net');
const Backbone = require('backbone');
const _ = require('underscore');

const PORT = 3002;
const server = net.createServer();
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const config = require('../public/config.json');

const ControllerModel = require('./ControllerModel');
const DevicesCollection = require('./collections/DevicesCollection');
const FacesCollection = require('./collections/FacesCollection');

const controller = new ControllerModel(config.ctrl);
const devices = new DevicesCollection(config.ctrl.devs);
const faces = new FacesCollection(prepareFaces(devices));

controller.set({
    devices,
    faces,
});

function prepareFaces(devs) {
    let faces = [];
    devs.each((d) => {
        faces = faces.concat(_.toArray(d.get('dfaces')));
    });
    return faces;
}

server.on('connection', handleConnection);
server.listen(PORT, () => {
    console.log('Testing controller server listening to %j', server.address());
});
const eventGroups = [
    'status',
    'values',
    'mode',
    'alarm',
];

function generateStatuses() {
    const dlength = devices.length - 1;
    const range = _.random(0, dlength);
    const devs = devices.models.slice(0, range);
    return devs.map(device => ({
            id: device.get('id'),
            stat: _.random(1, 6),
        }));
}

function generateValues() {
    const flength = faces.length - 1;
    const range = _.random(0, flength);
    const facs = faces.models.slice(0, range);

    return facs.map(face => ({
            id: face.get('id'),
            def: _.random(0, 100000),
        }));
}

function generateMode() {
    const dlength = devices.length - 1;
    const range = _.random(0, dlength);
    const devs = devices.models.slice(0, range);
    return devs.map(device => ({
            id: device.get('id'),
            mode: _.random(1, 6),
        }));
}


function generateAlarm() {
    const alength = devices.length - 1;
    return {
        dev: devices.models[_.random(0, alength)].get('id'),
        code: _.random(0, 41),
        stat: _.random(0, 6),
        date: moment(),
        ivan_id: uuidv1(),
    };
}

function generateData(action) {
    switch (action) {
        case 'status':
            return generateStatuses();
            break;
        case 'values':
            return generateValues();
            break;
        case 'state':
            return generateValues();
            break;
        case 'alarm':
            return generateAlarm();
            break;
        case 'mode':
            return generateMode();
            break;
        default:
            console.log('Uncorrect event type');
    }
    '';
}

function handleConnection(conn) {
    const remoteAddress = `${conn.remoteAddress}:${conn.remotePort}`;
    console.log('Client connected from %s', remoteAddress);
    conn.on('data', onConnData);
    conn.once('close', onConnClose);
    conn.on('error', onConnError);
    this.gen = setInterval(() => {
        const action = eventGroups[_.random(0, 3)];
        // const action = 'values';
        const data = generateData(action);

        console.log(`Sending changed data. Action: ${action}`);
        conn.write(JSON.stringify({
            eventGroup: action,
            data,
        }));
    }, 1000);

    function onConnData(d) {
        let body = {};
        try {
            body = JSON.parse(d.toString());
        } catch (e) {
            console.log(e);
        }
        console.log(body);
        const message = { eventGroup: 'controll', data: { uuid: body.arguments.uuid, executed: false } };
        setTimeout(() => {
            conn.write(JSON.stringify(message));
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


const shit = [
    {
        eventGroup: 'status',
        data: {
            id: 123,

        },
    },
];
