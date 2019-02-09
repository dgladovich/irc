import Backbone from 'backbone';
import GroupModel from '../models/DeviceGroupModel';


export default Backbone.Collection.extend({
    model: GroupModel
});
