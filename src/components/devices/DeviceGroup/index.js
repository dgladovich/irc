import device from './templates/device.jst';
import { View } from 'backbone.marionette';
import Modal from '../DeviceGroup/GroupModal';

export default View.extend({
    template: device,
    events: {
        'click': 'showInfo'
    },
    showInfo: function() {
        let modal = new Modal({ model: this.model })
        $('body').append(modal.render().el);
        modal.$('.modal.fade').modal()
    },
    onDestroy: function() {
        this.stopListening();
    },
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        if (this.model.get('devices').models[0].get('ctrl') !== app.devices.findWhere({ parent: null }).get('ctrl')) {
            this.$el.hide();
        }
        this.updateGroupStatus.call(this);
    },
    updateGroupStatus: function(device, value) {
        device = device ? device : this.model.get('devices').models[0];
        this.$el.removeClass(this.previousClass);
        let deviceStatus = app.statuses.findWhere({ id: device.get('sgrp')}).get('sgrps_opts').findWhere({num: device.get('stat')});
        if (deviceStatus !== undefined) {
            let danger = this.model.get('devices').where({ stat: 2 }),
                service = this.model.get('devices').where({ stat: 3 }),
                manual = this.model.get('devices').where({ stat: 4 }),
                die = this.model.get('devices').where({ stat: 6 }),
                repair = this.model.get('devices').where({ stat: 5 }),
                ready = this.model.get('devices').where({ stat: 0 }),
                active = this.model.get('devices').where({ stat: 1 });
            if (danger.length > 0) {
                this.previousClass = 'danger';
            } else {
                let filtered = this.model.get('devices').filter((item) => {
                    return item.get('stat') > 0;
                });

                if (device.get('stat') === 0) {
                    if (filtered.length > 0) {
                        this.previousClass = this.previousClass;
                    } else {
                        this.previousClass = deviceStatus.get('dclass');
                    }
                } else {
                    this.previousClass = deviceStatus.get('dclass')
                }
            }
        } else {
            this.previousClass = 'off';
            console.log('Get wrong status; Device' + this.model.get('id') + '; Status:' + this.model.get('stat') + '; Group:' + this.model.get('sgrp'))
        }
        this.$el.addClass(this.previousClass);
    },
    initialize: function() {
        this.model.set({
            devicesize: this.model.get('devices').models[0].get('devicesize')
        });
        this.model.get('devices').each((device) => {
            this.listenTo(device, 'change:stat', this.updateGroupStatus.bind(this))
        });
        //this.listenTo(this.model, 'change')
    }
});