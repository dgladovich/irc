import { View, Model } from 'backbone.marionette';
import { Spinner } from 'spin.js';
import Radio from 'backbone.radio';
import CameraError from './CameraError';
import filter from './templates/cameramodal.jst';

const visualChannel = Radio.channel('visual');
const spinnerOpts = {
  color: '#ccc',
};
export default View.extend({
  template: filter,
  className: 'modal fade',
  events: {
    'click .roll-up': 'rollUp',
  },
  regions: {
    video: '.video',
  },
  rollUp() {
    this.$el.modal({ show: false });
    visualChannel.trigger('roll-up', ({ url: this.url }));
  },
  initVideo(image) {
    this.spin = new Spinner(spinnerOpts).spin();
    this.$('.video').html(this.spin.el);

    this.connectionTimeout = setTimeout(() => {
      const errorMessage = new CameraError();

      this.spin.stop();
      this.$('.video').html(errorMessage.render().el);
      this.listenToOnce(errorMessage, 'connection:retry', () => {
        this.img.src = this.url;
        this.initVideo();
      });
    }, 10000);
    this.img.src = this.url;
  },
  onRender() {
    this.$el
      .modal({
        show: true,
        backdrope: 'static',
      })
      .on('hidden.bs.modal', () => {
        this.destroy();
      });
    this.initVideo();
  },
  initialize(opt) {
    this.url = opt.url;
    this.img = new Image() || image;
    this.img.addEventListener('load', () => {
      clearTimeout(this.connectionTimeout);
      this.$('.video').html(this.img);
    });
    this.img.addEventListener('error', (err) => {
      this.spin.stop();
      const errorMessage = new CameraError();
      this.$('.video').html(errorMessage.render().el);
      this.listenToOnce(errorMessage, 'connection:retry', () => {
        console.log('here we are retrying connection');
      });
    });
    this.initVideo();
  },

});
