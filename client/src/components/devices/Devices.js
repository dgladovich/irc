import { CollectionView, View } from 'backbone.marionette';
import Device from './Device/index.js';
import DeviceGroup from './DeviceGroup';
import Central from './Central';

export default CollectionView.extend({
  className: 't-wrap objects afade',
  childView(item) {
    item.set('devicesize', app.deviceSize);
    switch (item.get('presentation')) {
    case 'controller':
      return Device;
      break;
    case 'group':
      return DeviceGroup;
      break;
    case 'central':
      return Central;
      break;
    default:
      return Backbone.View;
    }
  },
  filter(item) {
    return !!item.get('active');
  },
  onRender() {
    this.$el.css({
      height: $(window).height() - (25 * $(window).height() / 100),
    });
    $(window).resize(() => {
      this.$el.css({
        height: $(window).height() - (25 * $(window).height() / 100),
      });
    });
    setTimeout(() => {
      this.$el.addClass('in');
    });
  },
});
