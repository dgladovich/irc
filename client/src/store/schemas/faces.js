export default {
  type: 'object',
  patternProperties: {
    '^[0-9.]+$': {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
        },
        viewtype: {
          anyOf: [{ type: 'null' }, { type: 'integer' }],
        },
        dev: {
          type: 'integer',
        },
        tardev: {
          anyOf: [{ type: 'null' }, { type: 'integer' }],
        },
        viewgrp: {
          type: 'integer',
        },
        stat_grp: {
          anyOf: [{ type: 'null' }, { type: 'integer' }],
        },
        meas: {
          anyOf: [{ type: 'null' }, { type: 'integer' }],
        },
        min_val: {
          type: 'integer',
        },
        max_val: {
          type: 'integer',
        },
        def: {
          type: 'integer',
        },
        lim_warning: {
          type: 'integer',
        },
        lin_warning_code: {
          type: 'integer',
        },
        lim_danger: {
          type: 'integer',
        },
        lim_danger_code: {
          anyOf: [{ type: 'null' }, { type: 'integer' }],
        },
        history_fix: {
          type: 'integer',
        },
        uce_range: {
          type: 'integer',
        },
        range_warn_min: {
          type: 'integer',
        },
        range_warn_min_code: {
          anyOf: [{ type: 'null' }, { type: 'integer' }],
        },
        range_warn_max: {
          type: 'integer',
        },
        range_warn_max_code: {
          anyOf: [{ type: 'null' }, { type: 'integer' }],
        },
        orde: {
          type: 'integer',
        },
        show_scat: {
          type: 'integer',
        },
        visible: {
          type: 'integer',
        },
        dvars: {
          type: 'array',
          items: [{
            patternProperties: {
              '^[0-9.]+$': {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                  },
                  num: {
                    type: 'integer',
                  },
                  grp: {
                    type: 'integer',
                  },
                  name: {
                    type: 'string',
                  },
                  clr: {
                    type: 'string',
                  },
                  bgclr: {
                    type: 'string',
                  },
                  active: {
                    type: 'integer',
                  },
                  dclass: {
                    type: 'string',
                  },
                },
              },
            },
          }],
        },
      },
    },
  },
};
