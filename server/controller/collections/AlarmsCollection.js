const Backbone = require('backbone');
const Radio = require('backbone.radio');

const ch = Radio.channel('controllerChannel');

const Alarm = Backbone.Model.extend({

    initialize() {
    },
});

const AlarmsCollection = Backbone.Collection.extend({
    model: Alarm,
});

module.exports = AlarmsCollection;
