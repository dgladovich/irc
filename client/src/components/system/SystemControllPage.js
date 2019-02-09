import ControllPanel from './ControllPanel';
import template from '../general/templates/page.jst';
import { View, Model } from 'backbone.marionette';

const tit_ctr  = 'tit_ctr';
 
export default View.extend({
    template: template,
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
    initialize: function() {
        this.model = new Backbone.Model({
            title: app.language[tit_ctr] || tit_ctr
        });
    }

});