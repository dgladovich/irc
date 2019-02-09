import { View } from 'backbone.marionette';
import template from './templates/group_modal.jst';

import Table from './GroupModalTable';
// import ValueTable from './GroupModalValueTable';

export default View.extend({
  template,
  events: {
    'click .btn-back': 'close',
  },
  regions: {
    statuses: {
      el: '.modal-statuses',
    },
    values: {
      el: '.modal-values',
    },
  },
  close() {
    this.destroy();
  },
  onRender() {
    this.showChildView('statuses', new Table({ collection: this.model.get('devices') }), this.model.toJSON());
    // this.showChildView('values', new ValueTable({collection: this.model.get('devices')}), this.model.toJSON());
  },
});
