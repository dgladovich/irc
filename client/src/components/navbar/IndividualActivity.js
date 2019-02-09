import Marionette from "backbone.marionette";
import Radio from "backbone.radio";
const individual = Radio.channel('individual');
const stat_offline = 'stat_offline', connection_with_controller = 'connection_with_controller', device_is_offline = 'device_is_offline', connection_with_server = 'connection_with_server';

const IndividualActivityModel = Backbone.Model.extend({
    initialize: function () {
        this.set({
            status: true,
            statusTitle: app.language[connection_with_controller] || connection_with_controller
        })
        individual.on('individual:activity', (response) => {
            this.set(response)
        });
    }
});

export default  Marionette.View.extend({
    template: _.noop,
    className: 'glyphicon glyphicon-hdd',
    tagName: 'span',
    attributes: {
        id: 'individual'
    },
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
        this.model = new IndividualActivityModel;
        if (app.controller.get('stat') === 6) {
            this.model.set({
                status: false,
                statusTitle: app.language[device_is_offline] || device_is_offline
            })
        }

        this.listenTo(this.model, 'change:status', this.updateStatus.bind(this))
    }
})