import { View } from 'backbone.marionette';
import Tabs from './Tabs';
import TabPanels from './TabPanels';
import template from './tabpanel.jst';

export default View.extend({
  template,
  regions: {
    tabs: '.tabs-wrapper-custom',
    tabpanels: '.tab-content',
  },
  onRender() {
    this.showChildView('tabs', this.tabs);
    this.showChildView('tabpanels', this.tabPanels);
    this.tabs.$el.children()[0].addClass('active');
    this.tabPanels.$el.children()[0].addClass('active');
  },
  initialize() {
    this.tabs = new Tabs({ collection: this.collection });
    this.tabPanels = new TabPanels({ collection: this.collection });
  },
});
