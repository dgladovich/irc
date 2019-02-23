import { t } from 'i18next';
import { View, Model } from 'backbone.marionette';
import template from './page.jst';

export default View.extend({
  template,
  events: {
    'click #close-page': 'closePage',
  },
  regions: {
    children: '.content',
  },
  closePage() {
    this.$el.fadeOut(500, () => {
      document.location.href = '#';
    });
  },
  onRender() {
    this.showChildView('children', this.getOption('children'));
    this.$el.fadeIn('slow');
  },


});
