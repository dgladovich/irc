import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';

const individual = Radio.channel('individual');
const stat_offline = 'stat_offline'; const connection_with_controller = 'connection_with_controller'; const device_is_offline = 'device_is_offline'; const
  connection_with_server = 'connection_with_server';

const IndividualActivityModel = Backbone.Model.extend({
  initialize() {
    this.set({
      status: true,
      statusTitle: app.language[connection_with_controller] || connection_with_controller,
    });
    individual.on('individual:activity', (response) => {
      this.set(response);
    });
  },
});

export default Marionette.View.extend({
  template: _.noop,
  className: 'glyphicon glyphicon-hdd',
  tagName: 'span',
  attributes: {
    id: 'individual',
  },
  updateStatus() {
    this.model.get('status') === true ? this.$el.removeClass('offline') : this.$el.addClass('offline');
    this.$el.tooltip({
      placement: 'bottom',
      trigger: 'hover',
      title: () => this.model.get('statusTitle'),
    });
  },
  onRender() {
    this.updateStatus();
  },
  initialize() {
    this.model = new IndividualActivityModel();
    if (app.controller.get('stat') === 6) {
      this.model.set({
        status: false,
        statusTitle: app.language[device_is_offline] || device_is_offline,
      });
    }

    this.listenTo(this.model, 'change:status', this.updateStatus.bind(this));
  },
});
