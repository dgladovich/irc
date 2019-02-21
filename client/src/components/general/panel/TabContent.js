import { View, Model } from 'backbone.marionette';
import template from './templates/tabcontent.jst';

export default View.extend({
  template,
  regions: {
    subview: {
      el: '.tab-pane',
    },
  },
  onRender() {
    this.setElement(this.$el);
  },
  initialize(opt) {
    this.subView = new opt.view({ collection: this.model.get(opt.viewKey) });
  },
});
