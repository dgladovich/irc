import Marionette from 'backbone.marionette';
import { t } from 'i18next';

const IndividualActivityModel = Backbone.Model.extend({
  initialize() {
    this.set({
      status: true,
      statusTitle: t('connection_with_controller'),
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
    this.model.get('status') ? this.$el.removeClass('offline') : this.$el.addClass('offline');
    // this.$el.tooltip({
    //   placement: 'bottom',
    //   trigger: 'hover',
    //   title: () => this.model.get('statusTitle'),
    // });
  },
  onRender() {
    this.updateStatus();
  },
  initialize() {
    const controller = window.smart.store.get('controller');
    this.model = new IndividualActivityModel();
    if (controller.get('stat') === 6) {
      this.model.set({
        status: false,
        statusTitle: t('device_is_offline'),
      });
    }

    this.listenTo(this.model, 'change:status', this.updateStatus.bind(this));
  },
});
