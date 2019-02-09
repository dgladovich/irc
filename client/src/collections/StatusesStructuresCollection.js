import Backbone from 'backbone';
import StatusStructure from '../models/StatusStructure';

export default Backbone.Collection.extend({
  url: 'statuses',
  model: StatusStructure,
});
