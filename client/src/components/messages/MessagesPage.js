import { View, Model } from 'backbone.marionette';
import template from '../general/templates/page.jst';


export default View.extend({
  template,
  events: {
    'click .back-top-button': 'hidePage',
  },
  hidePage() {
    document.location.href = '#';
  },
});
