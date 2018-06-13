import moment from 'moment';

export default Backbone.Collection.extend({
    comparator: function (item) {
        return item.get("id");
    },
    initialize: function () {
        app.devices.each((device) => {
            if (device.get('stat') === 2 || device.get('stat') === 3 || device.get('stat') === 5) {
                let valveStatus = app.statuses.findWhere({
                    s_grp: device.get('sgrp'),
                    num: device.get('stat')
                });
                let error = app.errors.findWhere({
                    id: device.get('ecode')
                });
                let deviceRepieter = new Backbone.Model({
                    id: device.get('id'),
                    name: device.get('name'),
                    idle_date: moment(device.get('idle_date')).format("DD.MM.YYYY"),
                    idle_hour: moment(device.get('idle_date')).format("HH:mm:ss"),
                    status: valveStatus,
                    error: error,
                });
                this.add(deviceRepieter);
                deviceRepieter.listenTo(device, 'change:stat', () => {
                    deviceRepieter.set('stat', device.get('stat'))
                });
            } else {
                let deviceRepieter = this.findWhere({id: device.get('id')});
                if (deviceRepieter) {
                    this.remove(deviceRepieter);
                }
            }
            this.listenTo(device, 'change:stat', (device) => {
                if (device.get('stat') === 2 || device.get('stat') === 3 || device.get('stat') === 5) {
                    let valveStatus = app.statuses.findWhere({id: device.get('sgrp')}).get('sgrps_opts').findWhere({num: device.get('stat')});
                    let error = app.errors.findWhere({
                        id: device.get('ecode')
                    });
                    let deviceRepieter = new Backbone.Model({
                        id: device.get('id'),
                        name: device.get('name'),
                        idle_date: moment(device.get('idle_date')).format("DD.MM.YYYY"),
                        idle_hour: moment(device.get('idle_date')).format("HH:mm:ss"),
                        status: valveStatus,
                        error: error,
                    });
                    this.add(deviceRepieter);
                } else {
                    let deviceRepieter = this.findWhere({id: device.get('id')});
                    if (deviceRepieter) {
                        this.remove(deviceRepieter);
                    }
                }
            });
        });

    }
});