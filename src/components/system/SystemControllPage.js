import ControllPanel from './ControllPanel';
import template from '../general/templates/page.jst';
import { View, Model } from 'backbone.marionette';

const model = new Backbone.Model({
    title: 'Управление системой'
});
 
export default View.extend({
    template: template,
    model: model,
    events: {
        'click #close-page': 'hidePage'
    },
    hidePage: function() {
        this.$el.fadeOut(500, ()=>{
            document.location.href = '#';
        });
    },
    regions: {
        content: '.panel-container'
    },
    onRender: function() {
        this.showChildView('content', new ControllPanel());
        this.$el.fadeIn('slow');

    },
    initialize: function() {}

});