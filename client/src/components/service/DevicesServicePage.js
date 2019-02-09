import { View, Model } from 'backbone.marionette';
import Radio from 'backbone.radio';
import template from './templates/devices_service_page.jst';
import DevicesService from './DevicesService';

const serviceChannel = Radio.channel('servicechannel');

export default View.extend({
  template,
  channelName: 'servicechannel',
  regions: {
    devicesservice: '#devices-service',
    journal: '#service-journal',
  },

  onRender() {
    this.collection = new Backbone.Collection(app.devices.findWhere({ parent: null }));

    this.showChildView('devicesservice', new DevicesService({
      collection: this.collection,
    }));
  },

  initialize() {},

});
