import template from './templates/instruction.jst';
import { View, Model } from 'backbone.marionette';



export default View.extend({
    template: template,
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
    }
});