import { View, Model } from 'backbone.marionette';
import template from './templates/modal.jst';
import ChartsCollection from './ChartsCollection';

export default View.extend({
  template,
  events: {
    'click .back-top-button': 'hidePage',
  },
  hidePage() {
    document.location.href = '#';
  },
  regions: {
    content: {
      el: '.modal-body',
    },
  },
  onRender() {
    this.$el = this.$el.children();
    // Unwrap the element to prevent infinitely
    // nesting elements during re-render.
    this.$el.unwrap();
    this.setElement(this.$el);
    this.showChildView('content', new ChartsCollection({ collection: app.faces }));
  },

});
