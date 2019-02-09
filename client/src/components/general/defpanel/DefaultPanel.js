import { View, CollectionView, Model } from 'backbone.marionette';
import Tabs from './Tabs';
import TabsContent from './TabsContent';
import template from './templates/tabpanel.jst';


export default View.extend({
  template,
  regions: {
    tabs: '.tabs-wrapper-custom',
    tabsContent: {
      el: '.controller-meas-list',
      replaceElement: true,
    },
  },
  onRender() {
    this.showChildView('tabs', this.tabs);
    this.showChildView('tabsContent', this.tabsContent);
    $(this.tabs.$el.children()[0]).addClass('active');
    $(this.tabsContent.$el.children()[0]).addClass('active');
  },
  initialize(opt) {
    this.tabs = new Tabs({ collection: this.collection });
    this.tabsContent = new TabsContent({ collection: this.collection });
  },
});
