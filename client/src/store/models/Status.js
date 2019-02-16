import Backbone from 'backbone';
import StatusesStructuresCollection from '../collections/StatusesStructures';

export default Backbone.Model.extend({
  initialize() {
    this.set({
      sgrps_opts: new Backbone.Collection(this.get('sgrps_opts')),
    });
  },
});
