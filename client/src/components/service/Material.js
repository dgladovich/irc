import { View, Model } from 'backbone.marionette';
import accounting from 'accounting';
import template from './templates/service_materials.jst';

export default View.extend({
  template,
  className: 'custom-table-row',
  onRender() {},
  initialize() {
    this.model.set({
      totalPrice: accounting.toFixed(this.model.get('price') /** this.model.get('count') */, 2),
    });
  },
});
