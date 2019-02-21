import { View, Model } from 'backbone.marionette';
import template from './templates/tabcontent.jst';

export default View.extend({
  template,
  onRender() {
    this.setElement(this.$el);
  },
});
