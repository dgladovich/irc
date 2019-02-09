import { View, Model } from 'backbone.marionette';
import Devices from './Devices';
import template from '../general/templates/page.jst';

const page_device_list = 'page_device_list';

export default View.extend({
  template,
  events: {
    'click #close-page': 'hidePage',
  },
  hidePage() {
    this.$el.fadeOut(500, () => {
      document.location.href = '#';
    });
  },
  regions: {
    content: '.panel-container',
  },
  /*    onDestroy: function() {
        this.devices.destroy();
        this.groups.destroy();
    }, */
  onRender() {
    this.showChildView('content', new Devices({ collection: this.devices }));
    this.$el.fadeIn('slow');
  },
  initialize(opt) {
    this.model = new Backbone.Model({
      title: app.language[page_device_list] || page_device_list,
    });
    this.devices = opt.data;
  },

});
