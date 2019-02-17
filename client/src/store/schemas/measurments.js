export default {
  type: 'object',
  patternProperies: {
    '^[0-9.]+$': {
      id: {
        type: 'integer',
      },
      name: {
        type: 'string',
      },
    },
  },
};
