const Backbone = require('backbone');
const Radio = require('backbone.radio');

const ch = Radio.channel('controllerChannel');

module.exports = Backbone.Model.extend({
    onChangeStatus() {
        const stat = this.get('stat');
        this.get('devices').each('');
    },
    initialize() {
        this.on('change:stat', this.onChangeStatus.bind(this));
    },
});
