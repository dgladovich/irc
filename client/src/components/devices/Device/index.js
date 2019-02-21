import { View } from 'backbone.marionette';
import template from './templates/device.jst';
import Modal from './DeviceModal';

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

  /*    getTemplate: function() {
        //Dont pay attention on this shit. In ZEO you will do much more
        if (this.model.get('ctrl') === 2) {
            if (this.model.get('id') === 2) {
                return body_template;

            } else {
                return device;
            }
        } else if (this.model.get('ctrl') === 5) {
            if (this.model.get('id') === 64) {
                return body_template;

            } else {
                return device;
            }
        } else if (this.model.get('ctrl') === 6) {
            if (this.model.get('typ') === 33) {
                return body_template;

            } else {
                return device;
            }
        } else {
            if (this.model.get('parent') === 0) {
                return device_main;
            } else {
                return device;
            }
        }
    }, */
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
    } else if (this.model.get('ctrl') === 5 && this.model.get('parent') === null) {
      this.destroy();
    } else if (this.model.get('ctrl') === 6 && this.model.get('parent') === null) {
      this.destroy();
    } else {
      this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this));
    }
  },
});
