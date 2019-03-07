import { fromJS } from 'immutable';

import { LOAD_CONFIG_SUCCESS } from './constants';

const initialState = fromJS({
  cotroller: {},
  controllers: [],
  devices: [],
  faces: [],
  viewgroups: [],
});

function configReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_CONFIG_SUCCESS:
      const {
        controller,
        controllers,
        devices,
        faces,
        viewgroups,
      } = action;
      return state
        .set('loading', false)
        .set('controller', controller)
        .set('controllers', controllers)
        .set('devices', devices)
        .set('faces', faces)
        .set('viewgroups', viewgroups)
        .set('devices', devices);
    default:
      return state;
  }
}

export default configReducer;
