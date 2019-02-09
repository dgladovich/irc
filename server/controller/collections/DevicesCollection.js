const Backbone = require('backbone');
const Radio = require('backbone.radio');

const ch = Radio.channel('controllerChannel');

const Device = Backbone.Model.extend({
    initialize() {
        function onChangeStatus() {
            ch.trigger('status', { id: this.get('id'), mode: this.get('mode'), stat: this.get('stat') });
            // console.log(`Status changed: ${this.get('name')}, ${this.get('stat')}`)
        }
        function onChangeMode() {
            ch.trigger('mode', { id: this.get('id'), mode: this.get('mode'), stat: this.get('stat') });
            // console.log(`Mode changed: ${this.get('name')}, ${this.get('mode')}`)
        }
        this.on('change:stat', onChangeStatus.bind(this));
        this.on('change:mode', onChangeMode.bind(this));
    },
});

const DevicesCollection = Backbone.Collection.extend({
    model: Device,
});

module.exports = DevicesCollection;
