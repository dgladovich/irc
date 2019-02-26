import { t } from 'i18next';
import { View, Model } from 'backbone.marionette';
import Backbutton from '../../ui/buttons/back';
import template from './page.jst';
import './page.scss';

export default View.extend({
  template,
  events: {
    'click #close-page': 'closePage',
  },
  regions: {
    children: '.content',
    backbutton: {
      el: '.button-back',
      replaceElement: true,
    },
  },
  closePage() {
    this.$el.fadeOut(500, () => {
      document.location.href = '#';
    });
  },
  onRender() {
    this.showChildView('backbutton', new Backbutton());
    this.showChildView('children', this.getOption('children'));
    this.$el.fadeIn('slow');
  },


});
