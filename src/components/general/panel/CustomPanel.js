import { View, CollectionView, Model } from 'backbone.marionette';
import Tabs from '../tabpanel/Tabs';
import TabsContent from './TabsContent';
import template from './templates/tabpanel.jst';



export default View.extend({
    template: template,
    regions: {
        tabs: '.tabs-wrapper-custom',
        tabsContent: {
            el: '.device-meas-list',
            replaceElement: true
        }
    },
    onRender: function() {

        this.showChildView( 'tabs', this.tabs );
        this.showChildView( 'tabsContent', this.tabsContent );
        $(this.tabs.$el.children()[0]).addClass('active');
        $(this.tabsContent.$el.children()[0]).addClass('active');
    },
    initialize: function(opt){
        this.tabs = new Tabs({ collection: this.collection });
        this.tabsContent = new TabsContent({ collection: this.collection, view: opt.view, viewKey: opt.viewKey });
    }
})