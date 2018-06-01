import template from './templates/instruction.jst';
import {View, Model} from 'backbone.marionette';


export default View.extend({
    template: template,
    regions: {
        dick: {
            el: '#about'
        }
    },
    // Get rid of that pesky wrapping-div.
onRender: function () {
    console.log(this.$el)
    // Unwrap the element to prevent infinitely
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
    }
});