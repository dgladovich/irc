import { View } from 'backbone.marionette';
import template from './templates/motovar.jst';


export default View.extend({
  template,
  className: 'modal-motovar',
  onRender() {
    this.updateMoto.call(this);
  },
  updateMoto() {
    this.$('.motovars').html(`Моточасы: ${this.model.get('moto')} час(ов)`);
  },
  initialize() {
    this.listenTo(this.model, 'change:moto', this.updateMoto.bind(this));
  },
});
