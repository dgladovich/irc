import { View } from 'backbone.marionette';
import template from '../general/templates/modal.jst';
import DayService from './DayServices';

export default View.extend({
  template,
  events: {
    'click .btn-back': 'close',
  },
  regions: {
    table: {
      el: '.modal-body',
    },
  },
  close() {
    this.destroy();
  },
  onRender() {
    this.showChildView('table', new DaySserv({ collection: this.model.get('faces') }));
    this.$('.modal.fade').on('hidden.bs.modal', () => {
      this.destroy();
    });
  },
});
