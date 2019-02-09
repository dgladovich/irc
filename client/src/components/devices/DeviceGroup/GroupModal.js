import { View } from 'backbone.marionette';
import template from '../Device/templates/modal.jst';
import GroupModalStatuses from './GroupModalStatuses';

export default View.extend({
  template,
  events: {
    'click .btn-back': 'close',
  },
  regions: {
    body: {
      el: '.modal-body',
    },
  },
  close() {
    this.destroy();
  },
  onRender() {
    const devices = this.model.get('devices');
    this.showChildView('body', new GroupModalStatuses({ collection: devices }));
    this.$('.modal.fade').on('hidden.bs.modal', () => {
      this.destroy();
    });
  },
});
