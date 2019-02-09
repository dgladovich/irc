import io from 'socket.io-client';
import Radio from 'backbone.radio';
import store from 'store';

const ch = Radio.channel('controller');
const channel = Radio.channel('controll');
const authChannel = Radio.channel('auth');

export default class ControllerConnection {
  constructor() {
    this.socket = io('http://192.168.15.21:9001');
    this.socket.on('connect', this.onConnectionEstablishing.bind(this));
  }

  onConnectionEstablishing(socket) {
    this._bindEvents.call(this, socket);
    this._bindUserEvents.call(this);
  }

  disconnect() {
    this.socket.close();
  }

  _bindEvents() {
    this.socket.on('controller', this.onReciveDataFromController.bind(this));
    this.socket.on('auth', this.onControllerRequireAuth.bind(this));
  }

  _bindUserEvents() {
    ch.on('controller', this.onUserAction.bind(this));
    channel.on('command:stop', this.onControllerStop.bind(this));
    channel.on('command:start', this.onControllerStart.bind(this));
    channel.on('command:speed', this.onControllerSpeedChange.bind(this));
    channel.on('command:repair:in', this.onRepairIn.bind(this));
    channel.on('command:repair:out', this.onRepairOut.bind(this));
  }

  onControllerStop() {
    const pack = {
      eventGroup: 'controll',
      method: 'stop',
      token: store.get('token'),
    };
    this.socket.emit('controller', pack);
  }

  onControllerStart() {
    const pack = {
      eventGroup: 'controll',
      method: 'start',
      token: store.get('token'),
    };
    this.socket.emit('controller', pack);
  }

  onControllerSpeedChange(speed) {
    const pack = {
      eventGroup: 'controll',
      method: 'speed',
      arguments: { speed },
      token: store.get('token'),

    };
    this.socket.emit('controller', pack);
  }

  onRepairIn(args) {
    const pack = {
      eventGroup: 'controll',
      method: 'repair:in',
      arguments: { id: args.id },
      token: store.get('token'),

    };
    this.socket.emit('controller', pack);
  }

  onRepairOut(args) {
    const pack = {
      eventGroup: 'controll',
      method: 'speed',
      arguments: { speed },
      token: store.get('token'),

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

  onControllerRequireAuth() {
    store.remove('user');
    store.remove('token');
    authChannel.trigger('change:auth');
    new Noty({
      text: 'Срок сессии истек!!! Авторизуйтесь пожалуйста!',
      theme: 'metroui',
      type: 'error',
      layout: 'topCenter',
      killer: true,
      timeout: 3000,
      progressBar: false,
    }).show();
  }

  onUserAlarmConfirmation(data) {
    const userConfirmation = {
      eventGroup: 'controll',
      method: 'confirm',
      arguments: data.arguments,
    };
    this.socket.emit('controller', userConfirmation);
  }

  onUserChangeSpeed(data) {
    const user_id = store.get('user').id;
    const userSpeedInfo = {
      eventGroup: 'controll',
      method: 'speed',
      arguments: data.arguments,
      user_id,
    };
    this.socket.emit('controller', userSpeedInfo);
  }

  onReciveDataFromController(data) {
    switch (data.eventGroup) {
    case 'status':
      _.each(data.data, (item) => {
        const { id, stat } = item;
        if (id) {
          const shit = app.devices.findWhere({ id });
          if (shit) {
            shit.set('stat', stat);
          } else {
            console.error('Error while device status');
          }
        }
      });
      // console.log('Statuses changed, ', res);
      break;
    case 'value':
      _.each(data.data, (item) => {
        const { id, def } = item;
        if (id) {
          const shit = app.faces.findWhere({ id });
          console.log(app.faces, item, shit);
          if (shit) {
            shit.set('def', def);
          } else {
            console.log(`%c Error while getting values from server. Face ID - ${id}, def - ${def} `, 'blue');
          }
        }
      });
      break;
    case 'alarm':
      if (data.method === 'add') {
        const alarm = data.arguments;
        app.alarms.add(alarm);
      } else {
        const alarm = app.alarms.findWhere({ ivan_id: data.arguments.ivan_id });
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
    }
  }
}
