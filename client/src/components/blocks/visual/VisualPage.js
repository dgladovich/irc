import { View, Model } from 'backbone.marionette';
import { t } from 'i18next';

import template from '../general/templates/page.jst';
import Filter from './VisualPageFilter';
import Noria from './VisualPageNoria';
import Conv from './VisualPageConv';
import Device from './Device';

export default View.extend({
  template,
  regions: {
    device: '.panel-container',
  },
  events: {
    'click #close-page': 'hidePage',
  },
  hidePage() {
    this.$el.fadeOut(500, () => {
      document.location.href = '#';
    });
  },
  onRender() {
    this.showChildView('controller', this.controller);
    this.$el.fadeIn('slow');
  },
  initialize() {
    this.model = new Backbone.Model({
      title: t('menu_visual_observ'),
    });
    this.controller = new Device();
  },

});
