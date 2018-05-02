import Backbone from 'backbone';
import Status from '../models/Status';

export default Backbone.Collection.extend({
    url: 'statuses',
    model: Status
})
