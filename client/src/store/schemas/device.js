import facesSchema from './faces';
import statusesSchema from './statuses';

export default {
  type: 'object',
  properties: {
    id: {
      type: 'integer',
    },
    ctrl: {
      type: 'integer',
    },
    typ: {
      type: 'integer',
    },
    contyp: {
      anyOf: [{ type: 'null' }, { type: 'integer' }],
    },
    grp: {
      anyOf: [{ type: 'null' }, { type: 'integer' }],
    },
    name: {
      type: 'string',
    },
    modif: {
      anyOf: [{ type: 'null' }, { type: 'integer' }],
    },
    moto: {
      type: 'integer',
    },
    body_id: {
      anyOf: [{ type: 'null' }, { type: 'integer' }],
    },
    parent: {
      anyOf: [{ type: 'null' }, { type: 'integer' }],
    },
    nomi: {
      anyOf: [{ type: 'null' }, { type: 'integer' }],
    },
    curr: {
      anyOf: [{ type: 'null' }, { type: 'integer' }],
    },
    x: {
      type: 'integer',
    },
    y: {
      type: 'integer',
    },
    sgrp: {
      anyOf: [{ type: 'null' }, { type: 'integer' }],
    },
    state_grp: {
      anyOf: [{ type: 'null' }, { type: 'integer' }],
    },
    stat: {
      type: 'integer',
    },
    state: {
      type: 'integer',
    },
    ecode: {
      type: 'integer',
    },
    repairable: {
      type: 'integer',
    },
    visible: {
      type: 'integer',
    },
    spec_act: {
      type: 'integer',
    },
    active: {
      type: 'integer',
    },
    dfaces: facesSchema,
    dports: {
      type: 'array',
    },
    nominals: {
      type: 'array',
    },
    stats: statusesSchema,
  },
};
