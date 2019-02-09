const Backbone = require('backbone');
const Radio = require('backbone.radio');

const ch = Radio.channel('controllerChannel');

const Alarm = Backbone.Model.extend({
    defaults: {
        date_confirm: null,
    },
    initialize() {
        this.on('change:usr_confirm', () => {
            if (this.get('usr_confirm') !== 0) {
                this.collection.remove(this);
            }
        });
    },
});

const AlarmsCollection = Backbone.Collection.extend({
    model: Alarm,
});

module.exports = AlarmsCollection;
