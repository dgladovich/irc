import { View } from 'backbone.marionette';
import template from './modal.jst';

export default View.extend({
  template,
  ui: {
    close: '.btn-back',
  },
  events: {
    'click @ui.close': 'closeModal',
  },
  regions: {
    children: '.modal-body',
  },
  closeModal() { },
  onRender() {
    this.showChildView('children', this.getOption('children'));
  },
});
