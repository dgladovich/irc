import { View, Model } from 'backbone.marionette';
import Radio from 'backbone.radio';
import device from './templates/device.jst';

const visualChannel = Radio.channel('visual');

export default View.extend({
  isModalOpen: false,
  template: device,
  events: {
    'click .btn-video': 'showModal',
  },
  showModal(e) {
    const model = this.model.get('cameras').findWhere({ id: +e.currentTarget.id });
    const url = `http://${model.get('ip')}/Streaming/Channels/102/preview`;
    visualChannel.trigger('visual:modal:open', { url });
  },
  initialize() {
    this.model = new Backbone.Model({
      cameras: app.controller.get('cameras'),
    });
  },
});
