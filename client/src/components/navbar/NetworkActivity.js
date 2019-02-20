import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import { t } from 'i18next';

const NetworkActivityModel = Backbone.Model.extend({
  initialize() {
    this.set({
      status: true,
      statusTitle: t('connection_established'),
    });
  },
});

export default Marionette.View.extend({
  template: _.noop,
  className: 'glyphicon glyphicon-globe',
  tagName: 'span',
  attributes: {
    id: 'network',
  },
  channelName: 'network',
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
    this.model = new NetworkActivityModel();
    this.listenTo(this.model, 'change:status', this.updateStatus.bind(this));
  },
});
