import Backbone from 'backbone';
import DevicesCollection from '../collections/Devices';
import DeviceGroupsCollection from '../collections/DeviceGroups';
import CamerasCollection from '../collections/Cameras';
import ControllerPassport from './ControllerPassport';

export default Backbone.Model.extend({
  initialize(opt) {
    // const { devices } = opt;
    // this.set({
    //   devices,
    //   devicesgroups: new DeviceGroupsCollection(this.get('dev_grps')),
    //   passport: new ControllerPassport(this.get('pass')),
    //   cameras: new CamerasCollection(this.get('cameras')),
    // });
  },
});
