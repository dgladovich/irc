import device from './device';

export default {
  required: ['name'],
  properties: {
    id: {
      type: 'integer',
    },
    typ: {
      type: 'integer',
    },
    ip: {
      type: 'string',
    },
    port: {
      type: 'integer',
    },
    name: {
      type: 'string',
    },
    cla: {
      type: 'integer',
    },
    plist: {
      type: 'integer',
    },
    stat: {
      type: 'integer',
    },
    mode_grp: {
      type: 'integer',
    },
    mode: {
      type: 'integer',
    },
    active: {
      type: 'integer',
    },
    devs: {
      type: 'array',
      items: device,
    },
  },
};
