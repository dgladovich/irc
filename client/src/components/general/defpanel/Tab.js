import { View, Model } from 'backbone.marionette';
import template from './templates/tab.jst';

export default View.extend({
    template: template,
    tagName: 'li',
    attributes: {
    	role: 'presentation'
    },
    className: 'pill-li',
    replaceElement: true,
    initialize: function(){}
});