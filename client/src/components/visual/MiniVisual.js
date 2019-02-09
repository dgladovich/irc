import { View, Model } from 'backbone.marionette';
import Hammer from 'hammerjs';
import { Spinner } from 'spin.js';
import Radio from 'backbone.radio';
import VisualClass from './Swiper';

const visualChannel = Radio.channel('visual');
const spinnerOpts = {
  color: '#ccc',
};
export default View.extend({
  template: _.noop,
  className: 'visual-window',
  events: {
    'click #close-page': 'hidePage',
  },
  hidePage() {
    this.$el.fadeOut(500, () => {
      document.location.href = '#';
    });
  },
  initVideo(image) {
    const img = new Image() || image;

    img.addEventListener('load', () => {
      this.$el.html(img);
    });
    img.addEventListener('error', (err) => {
    });
    img.src = this.url;
  },
  onRender() {
    const touch = new VisualClass(this.el);
    const mc = new Hammer(this.el);
    const spin = new Spinner(spinnerOpts).spin(this.el);
    mc.on('tap', (e) => {
      visualChannel.trigger('roll-out', { url: this.url });
      this.$el.fadeOut('fast', () => {
        spin.stop();
        this.destroy();
      });
    });
    this.$el
      .fadeIn('slow')
      .html(this.video);
  },
  initialize(opt) {
    this.url = opt.url;
    this.initVideo();
  },

});
