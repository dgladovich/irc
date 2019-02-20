import { View, Model } from 'backbone.marionette';
import { t } from 'i18next';

import template from '../general/templates/page.jst';
import EquipList from './EquipList';
import { setWrapHeight } from '../../Utils';


export default View.extend({
  template,
  events: {
    'click #close-page': 'hidePage',
  },
  regions: {
    content: '.panel-container',
  },
  hidePage() {
    this.$el.fadeOut(500, () => {
      document.location.href = '#';
    });
  },
  onRender() {
    this.showChildView('content', new EquipList({ collection: app.controllers }));
  },
  initialize() {
    this.model = new Backbone.Model({
      title: t('menu_select_device'),
    });
  },
});
