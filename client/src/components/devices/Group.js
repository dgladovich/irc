import { View } from 'backbone.marionette';
import device from './templates/device.jst';
import Modal from '../general/modal/GroupModal';

export default View.extend({
  template: device,
  events: {
    click: 'showInfo',
  },
  showInfo() {
    const modal = new Modal({ model: this.model });
    $('body').append(modal.render().el);
    modal.$('.modal.fade').modal();
  },
  onDestroy() {
    this.stopListening();
  },
  onRender() {
    if (this.model.get('devices').models[0].get('ctrl') !== app.devices.findWhere({ parent: 0 }).get('ctrl')) {
      this.$el.hide();
    }
    this.updateGroupStatus.call(this);
  },
  updateGroupStatus(device, value) {
    device = device || this.model.get('devices').models[0];
    this.$el.removeClass(this.previousClass);
    const deviceStatus = app.statuses.findWhere({ id: device.get('sgrp') }).get('sgrps_opts').findWhere({ num: device.get('stat') });
    if (deviceStatus !== undefined) {
      const danger = this.model.get('devices').where({ stat: 2 });


      const service = this.model.get('devices').where({ stat: 3 });


      const manual = this.model.get('devices').where({ stat: 4 });


      const die = this.model.get('devices').where({ stat: 6 });


      const repair = this.model.get('devices').where({ stat: 5 });


      const ready = this.model.get('devices').where({ stat: 0 });


      const active = this.model.get('devices').where({ stat: 1 });
      if (danger.length > 0) {
        this.previousClass = 'danger';
      } else {
        const filtered = this.model.get('devices').filter(item => item.get('stat') > 0);

        if (device.get('stat') === 0) {
          if (filtered.length > 0) {
            this.previousClass = this.previousClass;
          } else {
            this.previousClass = deviceStatus.get('dclass');
          }
        } else {
          this.previousClass = deviceStatus.get('dclass');
        }
      }
    } else {
      this.previousClass = 'off';
      console.log(`Get wrong status; Device${this.model.get('id')}; Status:${this.model.get('stat')}; Group:${this.model.get('sgrp')}`);
    }
    this.$el.addClass(this.previousClass);
  },
  initialize() {
    console.log(this.model);
    this.model.set({
      devicesize: this.model.get('devices').models[0].get('devicesize'),
    });
    this.model.get('devices').each((device) => {
      this.listenTo(device, 'change:stat', this.updateGroupStatus.bind(this));
    });
    // this.listenTo(this.model, 'change')
  },
});
