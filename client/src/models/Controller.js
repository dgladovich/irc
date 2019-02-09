import Backbone from 'backbone';
import DevicesCollection from '../collections/DevicesCollection';
import DeviceGroupsCollection from '../collections/DeviceGroupCollection';
import CamerasCollection from '../collections/CamerasCollection';
import ControllerPassport from './ControllerPassport';

export default Backbone.Model.extend({
  initialize() {
    this.set({
      devs: new DevicesCollection(this.get('devs')),
      deviceGroups: new DeviceGroupsCollection(this.get('dev_grps')),
      pass: new Backbone.Model(this.get('pass')),
      cameras: new Backbone.Collection(this.get('cameras')),
    });
  },
});
