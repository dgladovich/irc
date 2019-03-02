import { View } from 'backbone.marionette';
import 'bootstrap/js/src/tab';
import { Collection } from 'backbone';
import Tabs from './tabs';
import TabPanels from './tabpanels';
import template from './tabpanel.jst';
import './tabs.scss';

export default View.extend({
  template,
  className: 'tabpanel',
  regions: {
    tabs: {
      el: '.tabs-wrapper-custom',
      replaceElement: true,
    },
    tabpanels: {
      el: '.tab-content',
      replaceElement: true,
    },
  },
  onRender() {
    this.showChildView('tabs', this.tabs);
    this.showChildView('tabpanels', this.tabPanels);
    //this.tabs.$el.children()[0].addClass('active');
    //this.tabPanels.$el.children()[0].addClass('active');
  },
  initialize(opt) {
    this.collection = new Collection(opt.tabs);
    this.tabs = new Tabs({ collection: this.collection });
    this.tabPanels = new TabPanels({ collection: this.collection });
  },
});
