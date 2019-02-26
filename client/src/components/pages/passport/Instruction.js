import { View, Model } from 'backbone.marionette';
import template from './templates/instruction.jst';


export default View.extend({
  template,
  regions: {
    dick: {
      el: '#about',
    },
  },
  // Get rid of that pesky wrapping-div.
  onRender() {
    // Unwrap the element to prevent infinitely
    // Assumes 1 child element present in template.
    this.$el = this.$el.children();
    // nesting elements during re-render.
    this.$el.unwrap();
    this.setElement(this.$el);
  },
});
