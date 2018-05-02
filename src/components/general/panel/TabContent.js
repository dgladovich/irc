import { View, Model } from 'backbone.marionette';
import template from './templates/tabcontent.jst';

export default View.extend({
    template: template,
    regions: {
        subview: {
            el: `.tab-pane`
        }

    },
    onRender: function() {
        this.showChildView('subview', this.subView );
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
    },
    initialize: function(opt){
        this.subView = new opt.view({collection: this.model.get(opt.viewKey)});
    }
});