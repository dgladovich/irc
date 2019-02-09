import { View } from 'backbone.marionette';
import template from './templates/modal.jst';
import MessagesTable from './MessagesTable';

const info_no_mess = 'indo_no_mess';

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
  checkIsEmpty() {
    if (this.collection.length === 0) {
      this.$('#status-uzel1').modal('hide');
    }
  },
  close() {
    this.destroy();
  },
  onRender() {
    this.$('#status-uzel1').on('hidden.bs.modal', () => {
      this.destroy.bind(this);
    });
    if (this.collection.length > 0) {
      this.showChildView('table', new MessagesTable({ collection: this.collection }));
    } else {
      this.$('.modal-body').html(`<h4 class="messages-body">${app.language[info_no_mess] || info_no_mess}</h4>`);
    }
  },
  initialize() {
    this.listenTo(this.collection, 'remove', this.checkIsEmpty.bind(this));
  },
});
