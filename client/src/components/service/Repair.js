import { View, Model } from 'backbone.marionette';
import Radio from 'backbone.radio';
import aja from 'aja';
import template from './templates/repair.jst';

const serviceChannel = Radio.channel('servicechannel');

export default View.extend({
  template,
  ui: {
    input: '#repair-input',
    submit: '.make-repair',
  },
  events: {
    'input #repair-input': 'updateText',
    'click .make-repair': 'performRepair',
  },
  performRepair() {
    this.getUI('submit').prop('disabled', true);
    aja()
      .method('put')
      .url('/to/performrepair')
      .body(this.repair.toJSON())
      .on('200', (response) => {
        // well done
        serviceChannel.trigger('update:journal');
        this.getUI('submit').prop('disabled', false);
        this.getUI('input').val('');
      })
      .on('40x', (response) => {
        this.getUI('submit').prop('disabled', false);
        // something isdefinitely wrong
        // 'x' means any number (404, 400, etc. will match)
      })
      .on('500', (response) => {
        this.getUI('submit').prop('disabled', false);
        // oh crap
      })
      .go();
  },
  updateText(e, val, el) {
    const text = $(e.currentTarget).val();
    this.repair.set('text', text);
  },
  updateButton() {
    if (this.getUI('input').val().length === 0) {
      this.getUI('submit').prop('disabled', true);
    } else {
      this.getUI('submit').prop('disabled', false);
    }
  },
  onRender() {
    this.updateButton();
  },
  initialize() {
    this.repair = new Backbone.Model({
      deviceName: this.model.get('name'),
      ctrl: this.model.get('ctrl'),
      deviceId: this.model.get('id'),
      text: '',
    });
    this.listenTo(this.repair, 'change:text', this.updateButton.bind(this));
  },


});
