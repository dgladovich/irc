import { View, Model } from 'backbone.marionette';
import template from './templates/devser.jst';
import ServicesCollection from './ServicesCollection';
import Repair from './Repair';

const DeviceServiceCollection = Backbone.Collection.extend({
  comparator(item) {
    return item.get('ser_num');
  },
});

export default View.extend({
  template,
  regions: {
    services: {
      el: '#services',
    },
    repair: {
      el: '#repair',
    },
  },

  onRender() {
    this.showChildView('services', new ServicesCollection({
      collection: new DeviceServiceCollection(this.model.get('service')),
    }));
    this.showChildView('repair', new Repair({
      model: this.model,
    }));
  },
  initialize() {
    app.services.on('sync', () => {
      this.model.set('service', app.services.where({ dev: this.model.get('id') }));

      this.render();
    });
  },


});
