const Backbone = require('backbone');
const Radio = require('backbone.radio');

const ch = Radio.channel('controllerChannel');

const Face = Backbone.Model.extend({
    initialize() {
        function onChangeValue() {
            ch.trigger('value', { id: this.get('id'), def: this.get('def') });
            // console.log(`Value changed: ${this.get('name')}, ${this.get('def')}`)
        }
        this.on('change:def', onChangeValue.bind(this));
    },
});

const FacesCollection = Backbone.Collection.extend({
    model: Face,
});

module.exports = FacesCollection;
