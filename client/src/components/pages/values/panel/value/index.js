import { View, Model } from 'backbone.marionette';
import template from './value.jst';

export default View.extend({
  template,
  className: 'col-xs-12 col-sm-6 col-lg-6',
  onDestroy() {
    this.stopListening();
  },
  onRender() {
    this.updateValue.call(this);
  },
  updateValue() {
    this.$('.status').html(this.model.get('def'));
    this.updateStatus.call(this);
  },
  updateStatus() {
    const indicator = this.$('.item');
    const status = app.statuses.findWhere({
      grp: this.model.get('stat_grp'),
      num: this.model.get('def'),
    });

    indicator.removeClass(this.previousClass);

    if (status !== undefined) {
      switch (status.get('clr')) {
      case '#c7c7c9':
      {
        this.previousClass = '';
        break;
      }
      case '#e12c0d':
      {
        this.previousClass = 'danger';

        break;
      }
      case 'lime':
      case '#0db800':
      {
        this.previousClass = 'active';
        break;
      }
      default:
      {
        this.previousClass = 'off';
        break;
      }
      }
    }

    indicator.addClass(this.previousClass);
  },
  initialize() {
    this.previousClass = '';
    this.listenTo(this.model, 'change:def', this.updateValue.bind(this));
  },
});
