export default {
  type: 'object',
  patternProperies: {
    '^[0-9.]+$': {
      id: {
        type: 'integer',
      },
      typ: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
      reason: {
        type: 'string',
      },
      solutions: {
        type: 'string',
      },
      dtypes: {
        type: 'string',
      },
    },
  },
};
