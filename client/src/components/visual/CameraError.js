import { View } from 'backbone.marionette';
import template from './templates/cameraerror.jst';

export default View.extend({
  template,
  className: 'camera-error',
  events: {
    'click .btn': 'retryAttempt',
  },
  retryAttempt() {
    this.trigger('connection:retry');
  },
});
