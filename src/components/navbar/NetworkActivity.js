import Marionette from "backbone.marionette";
import Radio from "backbone.radio";

const network = Radio.channel('network');
const stat_offline = 'stat_offline', connection_established = 'connection_established',
    device_is_offline = 'device_is_offline', connection_with_server = 'connection_with_server';

const NetworkActivityModel = Backbone.Model.extend({
    initialize: function () {
        this.set({
            status: true,
            statusTitle: app.language[connection_established] || connection_established
        });
        network.on('network:activity', (response) => {
            this.set(response)
        });
    }
});

export default Marionette.View.extend({
    template: _.noop,
    className: 'glyphicon glyphicon-globe',
    tagName: 'span',
    attributes: {
        id: 'network'
    },
    channelName: 'network',
    updateStatus: function () {
        this.model.get('status') === true ? this.$el.removeClass('offline') : this.$el.addClass('offline');
        this.$el.tooltip({
            placement: 'bottom',
            trigger: 'hover',
            title: () => {
                return this.model.get('statusTitle')
            },
        })
    },
    onRender: function () {
        this.updateStatus();

    },
    initialize: function () {
        this.model = new NetworkActivityModel;
        this.listenTo(this.model, 'change:status', this.updateStatus.bind(this))
    }
})