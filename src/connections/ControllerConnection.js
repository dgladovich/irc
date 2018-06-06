import io from 'socket.io-client';
import store from 'store';
import Radio from 'backbone.radio';

const ch = Radio.channel('controller');
const channel = Radio.channel('controll');

export default class ControllerConnection {
    constructor() {
        this.socket = io('http://192.168.15.21:9001');
        this.socket.on('connect', this.onConnectionEstablishing.bind(this))

    }

    onConnectionEstablishing(socket) {
        this._bindEvents.call(this, socket);
        this._bindUserEvents.call(this);
    }

    disconnect() {
        this.socket.close();
    }

    _bindEvents() {
        this.socket.on('controller', this.onReciveDataFromController.bind(this))
    }

    _bindUserEvents() {
        ch.on('controller', this.onUserAction.bind(this));
        channel.on('command:stop', this.onControllerStop.bind(this));
        channel.on('command:start', this.onControllerStart.bind(this));
        channel.on('command:speed', this.onControllerSpeedChange.bind(this));
    }

    onControllerStop() {
        let pack = {
            eventGroup: 'controll',
            method: 'stop'
        };
        this.socket.emit('controller', pack);
    }

    onControllerStart() {
        let pack = {
            eventGroup: 'controll',
            method: 'start'
        };
        this.socket.emit('controller', pack);
    }

    onControllerSpeedChange(speed) {

        let pack = {
            eventGroup: 'controll',
            method: 'speed',
            arguments: {speed: speed}

        };
        this.socket.emit('controller', pack);
    }

    onUserAction(data) {
        switch (data.action) {
            case 'confirm':
                this.onUserAlarmConfirmation.call(this, data);
                break;
            case 'stop':
                break;
            case 'start':
                break;
            case 'speed':
                this.onUserChangeSpeed.call(this, data);
                break;
            case 'out_repair':
                break;
            case 'to_repair':
                break;

        }
    }

    onUserAlarmConfirmation(data) {
        let userConfirmation = {
            eventGroup: 'controll',
            method: 'confirm',
            arguments: data.arguments
        };
        this.socket.emit('controller', userConfirmation)
    }

    onUserChangeSpeed(data) {
        let user_id = store.get('user').id;
        let userSpeedInfo = {
            eventGroup: 'controll',
            method: 'speed',
            arguments: data.arguments,
            user_id: user_id
        }
        this.socket.emit('controller', userSpeedInfo)
    }

    onReciveDataFromController(data) {

        switch (data.eventGroup) {
            case 'status':
                _.each(data.data, (item) => {
                    let {id, stat} = item;
                    if (id) {
                        let shit = app.devices.findWhere({id: id});
                        if (shit) {
                            shit.set('stat', stat);

                        } else {
                            console.error('Error while device status')
                        }
                    }
                });
                //console.log('Statuses changed, ', res);
                break;
            case 'value':
                _.each(data.data, (item) => {
                    let {id, def} = item;
                    if (id) {
                        let shit = app.faces.findWhere({id: id});
                        if (shit) {

                            shit.set('def', def);
                        } else {
                            console.log(`%c Error while getting values from server`, 'blue');
                        }
                    }
                });
                break;
            case 'alarm':
                if (data.method === 'add') {
                    let alarm = data.arguments;
                    app.alarms.add(alarm)
                } else {
                    let alarm = app.alarms.findWhere({ivan_id: data.arguments.ivan_id});
                    app.alarms
                        .remove(alarm);
                }
                break;
            case 'controll':
                break;
            case 'speed':
                app.controller.set('speed', data.data.speed);
                break;
            default:
                return;
        }
    }
}