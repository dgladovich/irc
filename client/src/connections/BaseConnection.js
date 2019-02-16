import socket from 'socket.io-client';
import { Model, Collection } from 'backbone';

export default class {
  constructor(opt) {
    const {
      url,
      options,
      store,
      subscriptions,
    } = opt;
    this.subscriptions = subscriptions || {};
    this.store = store || {};
    this.url = url || window.location;
    this.path = options.path || '/';
    this.actions = {
      model: {
        rest: {
          update: (model, properties) => model.set(properties),
          delete: model => model.destroy(),
        },
        rpc: {},
      },
      collection: {
        rest: {
          add: (collection, properties) => collection.add(properties),
          delete: (collection, model) => collection.destroy(model),
          update: (collection, properties) => collection.find(),
        },
        rpc: {},
      },
    };
  }

  connect() {
    return socket.io(this.url, { path: this.path });
  }

  validateOptions() { }

  disconnect() {
    this.socket.close();
  }

  subscribe(hash) {
    this.subscriptions = hash;
    Object.keys(this.subscriptions).forEach((key) => {
      const subscription = this.subscriptions[key];
      const obj = this.store[subscription] || this.store[subscription.instance] || subscription || (function () { throw new Error('Cannot find instance') }());
      const instance = obj instanceof Model && 'model' || obj instanceof Collection && 'collection' || undefined;
      !instance && (function () { throw new Error('Not backbone instance') }());
      const { rest, rpc } = this.actions[instance];
      this.socket.on(key, (data) => {
        const { action, params } = data;
        const aliasesObject = subscription.rest && subscription.rest.aliases || {};
        const restAliases = Object
          .keys(aliasesObject)
          .reduce((acc, key) => acc[aliasesObject[key]] = this.actions[aliasesObject[key]], {});
        const restModificators = subscription instanceof String ? {} : subscription.rest && subscription.rest.actions;
        const modifiedRestFunctions = { ...rest, ...restAliases, ...restModificators };
        modifiedRestFunctions[action](obj, params);
      });
    })
  }

  unsubscibe(events) {
    events.forEach(item => this.socket.off(item));
  }
}
const subscribe = () => { };
const unsubscibe = () => { };

unsubscibe(['device', 'alarm']);
subscribe({
  device: 'devices',
  alarm: {
    instance: 'alarms',
    rest: {
      actions: {
        confirm: (params, model, collection) => { },
        origin: (params, model, collection) => { },
      },
      aliases: {
        confirm: 'add',
      },
    },
    rpc: {},
  },
  command: {
    collection: {
    },
  },
  controller: {
    model: 'controller',
    rest: {
      update: (params, model) => { },
    },
  },
});
