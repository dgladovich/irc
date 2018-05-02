import Backbone from 'backbone';
import _ from 'underscore';
import GroupModel from '../models/DeviceGroupModel';


export default Backbone.Collection.extend({
    model: GroupModel
});
