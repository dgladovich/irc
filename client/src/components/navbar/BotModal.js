import { View } from 'backbone.marionette';
import Radio from 'backbone.radio';
import template from './templates/botmodal.jst';
import Analitics from './Analitics';

const bot = Radio.channel('bot');

export default View.extend({
  template,
  events: {
    'click .btn-back': 'close',
  },
  regions: {
    analitics: {
      el: '.modal-body',
    },
  },
  close() {
    this.destroy();
  },
  onRender() {
    this.showChildView('analitics', new Analitics());

    this.$('#status-uzel1').on('hidden.bs.modal', () => {
      this.destroy.bind(this);
    });
  },
});
