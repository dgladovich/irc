import Backbone from 'backbone';

export default Backbone.Model.extend({
  initialize() {
    this.on('change:stat', () => { });
  },
});
