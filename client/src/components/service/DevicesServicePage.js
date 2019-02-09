import template from './templates/devices_service_page.jst';
import { View, Model } from 'backbone.marionette';
import Radio from 'backbone.radio';
import DevicesService from './DevicesService';

const serviceChannel = Radio.channel('servicechannel');

export default View.extend({
    template: template,
    channelName: "servicechannel",
    regions: {
        devicesservice: '#devices-service',
        journal: '#service-journal',
    },

    onRender: function() {
        this.collection = new Backbone.Collection(app.devices.findWhere({parent: null}));

        this.showChildView('devicesservice', new DevicesService({
            collection: this.collection
        }));
    },

    initialize: function() {}

});