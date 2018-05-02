import io from 'socket.io-client';
import Radio from 'backbone.radio';

const ch = Radio.channel('controller');

export default class ControllerConnection {
    constructor() {
        this.socket = io('http://localhost:9001');
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
                    let alarm = app.alarms.findWhere({ ivan_id: data.arguments.ivan_id });
                    app.alarms
                        .remove(alarm);
                }
                break;
            case 'controll':
                break;
            default:
                return;
        }
    }
}