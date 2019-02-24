import { View } from 'backbone.marionette';
import template from './valve.jst';

export default View.extend({
  template,
  showStatus() {
    const device = this.$('.klap');
    device.removeClass(this.previousClass);
    const deviceStatus = app.statuses.findWhere({
      grp: this.model.get('sgrp'),
      num: this.model.get('stat'),
    });
    if (deviceStatus !== undefined) {
      switch (deviceStatus.get('clr')) {
        case '#c7c7c9':
          {
            this.previousClass = '';
            break;
          }
        case '#e12c0d':
          {
            this.previousClass = 'danger';

            break;
          }
        case '#FFEB3B':
          {
            this.previousClass = 'service';

            break;
          }
        case 'lime':
        case '#0db800':
          {
            this.previousClass = 'active';
            break;
          }
        default:
          {
            this.previousClass = 'off';
            break;
          }
      }
    } else {
      console.log(`Get wrong status; Device${this.model.get('id')}; Status:${this.model.get('stat')}; Group:${this.model.get('sgrp')}`);
    }


    device.addClass(this.previousClass);
  },
  onDestroy() {
    this.stopListening();
  },
  initialize() {
    this.previousClass = '';
    this.listenTo(this.model, 'change', this.showStatus.bind(this));
  },
});
