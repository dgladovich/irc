import { View } from 'backbone.marionette';
import template from './templates/central.jst';

import Modal from './CentralModal';

export default View.extend({
  template,
  events: {
    click: 'showInfo',
  },
  showInfo() {
    const modal = new Modal({ model: this.model });
    $('body').append(modal.render().el);
    modal.$('.modal.fade').modal();
  },
  updateStatus() {
    let device = this.$el;
    this.$el.hasClass('main-obj') ? device = this.$('.obj-item') : device;
    device.removeClass(this.previousClass);

    const deviceStatus = app.statuses.findWhere({ id: this.model.get('sgrp') }).get('sgrps_opts').findWhere({ num: this.model.get('stat') });

    if (deviceStatus !== undefined) {
      this.previousClass = deviceStatus.get('dclass');
    } else {
      this.previousClass = 'off';
      console.log(`Get wrong status; Device${this.model.get('id')}; Status:${this.model.get('stat')}; Group:${this.model.get('sgrp')}`);
    }

    // console.log(this.previousClass)
    device.addClass(this.previousClass);
  },
  onRender() {
    if (this.model.has('grp')) {
      if (this.model.get('grp') !== 0) {
        this.$el.hide();
      }
    }
    this.updateStatus();
  },
  initialize() {
    this.previousClass = '';
    if (this.model.get('size') === 0 || this.model.get('visible') === 0) {
      this.destroy();
    }
    if (this.model.get('ctrl') === 2 && this.model.get('parent') === 0) {
      this.destroy();
    } else if (this.model.get('ctrl') === 5 && this.model.get('parent') === 0) {
      this.destroy();
    } else if (this.model.get('ctrl') === 6 && this.model.get('parent') === 0) {
      this.destroy();
    } else {
      this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this));
    }
  },
});
