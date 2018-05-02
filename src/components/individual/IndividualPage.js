import template from './templates/individual.jst';
import { View, Model } from 'backbone.marionette';
import { setWrapHeightN } from '../../Utils';


export default View.extend({
    template: template,
    events: {
        'click #close-page': 'hidePage'
    },
    regions: {
        'controllers': '.row'
    },
    hidePage: function() {
        this.$el.fadeOut(500, ()=>{
            document.location.href = '#';
        });
    },
    onRender: function(){
    	this.$el.fadeIn('slow');
    	setWrapHeightN(this.$('.t-wrap'));
    }
});