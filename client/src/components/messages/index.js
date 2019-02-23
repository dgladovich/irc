import { View, Model } from 'backbone.marionette';

export default View.extend({
  events: {
    'click .back-top-button': 'hidePage',
  },
  hidePage() {
    document.location.href = '#';
  },
});
