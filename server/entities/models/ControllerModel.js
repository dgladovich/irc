const Backbone = require('backbone');
const Radio = require('backbone.radio');
const ch = Radio.channel('controllerChannel');

module.exports = Backbone.Model.extend({
    onChangeStatus: function(){
        let stat = this.get('stat');
        this.get('devices').each('')
    },
    initialize: function(){
        this.on('change:stat', this.onChangeStatus.bind(this))
    }
});