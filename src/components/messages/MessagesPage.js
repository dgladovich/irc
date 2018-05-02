import template from '../general/templates/page.jst';
import { View, Model } from 'backbone.marionette';


export default View.extend({
    template: template,
    events: {
        'click .back-top-button': 'hidePage'
    },
    hidePage: function() {

        document.location.href = '#';

    },
});