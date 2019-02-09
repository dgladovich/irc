import { View, Model } from 'backbone.marionette';
import template from './templates/shield.jst';


export default View.extend({
  template,
  onBeforeRender() {

  },
  onRender() {
    // Get rid of that pesky wrapping-div.
    // Assumes 1 child element present in template.
    this.$el = this.$el.children();
    // Unwrap the element to prevent infinitely
    // nesting elements during re-render.
    this.$el.unwrap();
    this.setElement(this.$el);
  },
  initialize() {
    this.model = app.controller.get('pass');
  },
});
