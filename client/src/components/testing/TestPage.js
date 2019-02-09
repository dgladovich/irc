import { View, Model } from 'backbone.marionette';
import filter from './templates/test.jst';

export default View.extend({
  template: filter,

  onRender() {
    this.$('#about').slimScroll({ width: 500 });
  },

});
