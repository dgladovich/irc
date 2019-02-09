import { View, Model } from 'backbone.marionette';
import template from '../general/templates/page.jst';
// import EquipItem from './EquipItem';
import EquipList from './EquipList';
import { setWrapHeight } from '../../Utils';

const menu_select_device = 'menu_select_device';

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
      title: app.language[menu_select_device] || menu_select_device,
    });
  },
});
