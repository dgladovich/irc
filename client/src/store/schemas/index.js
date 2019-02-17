import controllerSchema from './controller';
import statusesSchema from './statuses';
import errorsSchema from './errors';
import userSchema from './user';
import measurmentsSchema from './measurments';

export const configSchema = {
  type: 'object',
  properties: {
    ctrl: controllerSchema,
    statuses: statusesSchema,
    ecodes: errorsSchema,
    usrs: {
      type: 'array',
      items: userSchema,
    },
    meas: measurmentsSchema,
  },
};
