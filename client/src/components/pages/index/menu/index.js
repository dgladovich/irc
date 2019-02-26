import { View, Model } from 'backbone.marionette';
import template from './templates/menu.jst';

export default View.extend({
  template,
  className: 't-wrap',
  onRender() {
    this.$el.fadeIn(800);
  },
});
