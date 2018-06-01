import template from './templates/passport.jst';
import {View, Model} from 'backbone.marionette';

export default View.extend({
    template: template,
    onRender() {
        console.log(this.$('#about'))
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        /*        this.$el = this.$el.children();
                // Unwrap the element to prevent infinitely
                // nesting elements during re-render.
                this.$el.unwrap();
                this.setElement(this.$el);*/
        console.log(this.el)


    }
});