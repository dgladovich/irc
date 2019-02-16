import Backbone from 'backbone';
import DevicesCollection from '../collections/Devices';
import DeviceGroupsCollection from '../collections/DeviceGroups';
import CamerasCollection from '../collections/Cameras';
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
