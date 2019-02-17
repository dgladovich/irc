import moment from 'moment';
import _ from 'lodash';

export default Backbone.Collection.extend({
  comparator(item) {
    return item.get('id');
  },
  initialize() {
    // const devices = app.devices.where({ active: 1, visible: 1 });
    // _.each(devices, (device) => {
    //   if (device.get('stat') === 2 || device.get('stat') === 3 || device.get('stat') === 5) {
    //     const valveStatus = app.statuses.findWhere({
    //       s_grp: device.get('sgrp'),
    //       num: device.get('stat'),
    //     });
    //     const error = app.errors.findWhere({
    //       id: device.get('ecode'),
    //     });
    //     const deviceRepieter = new Backbone.Model({
    //       id: device.get('id'),
    //       name: device.get('name'),
    //       idle_date: moment(device.get('idle_date')).format('DD.MM.YYYY'),
    //       idle_hour: moment(device.get('idle_date')).format('HH:mm:ss'),
    //       status: valveStatus,
    //       error,
    //     });
    //     this.add(deviceRepieter);
    //     deviceRepieter.listenTo(device, 'change:stat', () => {
    //       deviceRepieter.set('stat', device.get('stat'));
    //     });
    //   } else {
    //     const deviceRepieter = this.findWhere({ id: device.get('id') });
    //     if (deviceRepieter) {
    //       this.remove(deviceRepieter);
    //     }
    //   }
    //   this.listenTo(device, 'change:stat', (device) => {
    //     if (device.get('stat') === 2 || device.get('stat') === 3 || device.get('stat') === 5) {
    //       const valveStatus = app.statuses.findWhere({ id: device.get('sgrp') }).get('sgrps_opts').findWhere({ num: device.get('stat') });
    //       const statuses = device.get('stats');
    //       const error = app.errors.findWhere({
    //         id: device.get('ecode'),
    //       });
    //       const deviceRepieter = new Backbone.Model({
    //         id: device.get('id'),
    //         name: device.get('name'),
    //         idle_date: moment(device.get('idle_date')).format('DD.MM.YYYY'),
    //         idle_hour: moment(device.get('idle_date')).format('HH:mm:ss'),
    //         status: valveStatus,
    //         statuses,
    //         error,
    //       });
    //       this.add(deviceRepieter);
    //     } else {
    //       const deviceRepieter = this.findWhere({ id: device.get('id') });
    //       if (deviceRepieter) {
    //         this.remove(deviceRepieter);
    //       }
    //     }
    //   });
    // });
  },
});
