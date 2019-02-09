import template from './templates/cameraerror.jst';
import {View} from 'backbone.marionette';

export default View.extend({
    template: template,
    className: 'camera-error',
    events: {
        'click .btn': 'retryAttempt'
    },
    retryAttempt: function () {
        this.trigger('connection:retry');
    }
});