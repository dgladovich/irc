const Backbone = require('backbone');
const Radio = require('backbone.radio');

const ch = Radio.channel('controllerChannel');

const Queue = Backbone.Model.extend({
    defaults: {
        status: 'pending',
    },
    initialize() {
        this.on('change:status', () => {
            if (this.get('status') === 'executed') {
                this.collection.remove(this);
            } else {

            }
        });
    },
});

const QueueCollection = Backbone.Collection.extend({
    url: '/que',
    model: Queue,
});

module.exports = QueueCollection;
