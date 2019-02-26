import { View } from 'backbone.marionette';
import template from '../Device/templates/modal.jst';


import Motovars from './CentralMoto';

export default View.extend({
  template,
  events: {
    'click .btn-back': 'close',
  },
  regions: {
    moto: {
      el: '.modal-body',
    },
  },
  close() {
    this.destroy();
  },
  onRender() {
    this.showChildView('moto', new Motovars({ model: this.model }));

    this.$('.modal.fade').on('hidden.bs.modal', () => {
      this.destroy();
    });
  },
});
