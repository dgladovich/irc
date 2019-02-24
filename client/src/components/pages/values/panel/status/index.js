import { View } from 'backbone.marionette';
import template from './status.jst';

export default View.extend({
  template,
  onDestroy() {
    this.stopListening();
  },
  onBeforeRender() {},
  onRender() {
    //this.updateStatus.call(this);
  },
  updateStatus() {
    const indicator = this.$('.item');
    const valueStatus = app.statuses.findWhere({ id: this.model.get('stat_grp') }).get('sgrps_opts').findWhere({ num: this.model.get('def') });
    indicator.removeClass(this.previousClass);

    if (valueStatus !== undefined) {
      this.previousClass = valueStatus.get('dclass');
      this.$('.status-name').html(valueStatus.get('translate'));
    } else {
      this.previousClass = 'off';
      // console.log('Get wrong status; Value' + this.model.get('id') + '; Value' + this.model.get('name') + '; Status:' + this.model.get('def') + '; Group:' + this.model.get('stat_grp'))
    }

    indicator.addClass(this.previousClass);
  },
  initialize() {
    this.previousClass = '';
    this.listenTo(this.model, 'change:def', this.updateStatus.bind(this));
  },
});
