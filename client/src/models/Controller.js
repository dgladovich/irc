import DevicesCollection from '../collections/DevicesCollection';
import DeviceGroupsCollection from '../collections/DeviceGroupCollection';
import CamerasCollection from '../collections/CamerasCollection';
import ControllerPassport from '../models/ControllerPassport';
import Backbone from 'backbone';

export default Backbone.Model.extend({
    initialize: function(){
        this.set({
            devs: new DevicesCollection(this.get('devs')),
            deviceGroups: new DeviceGroupsCollection(this.get('dev_grps')),
            pass: new Backbone.Model(this.get('pass')),
            cameras: new Backbone.Collection(this.get('cameras'))
        })
    }
});