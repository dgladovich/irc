import template from '../general/templates/page.jst';
import Filter from './VisualPageFilter';
import Noria from './VisualPageNoria';
import Conv from './VisualPageConv';
import Device from './Device';
import { View, Model } from 'backbone.marionette';

const menu_visual_observ = 'menu_visual_observ';

export default View.extend({
    template: template,
    regions: {
        device: '.panel-container'
    },
    events: {
        'click #close-page': 'hidePage'
    },
    hidePage: function() {
        this.$el.fadeOut(500, ()=>{
            document.location.href = '#';
        });
    },
    onRender: function(){
        this.showChildView('controller', this.controller);
        this.$el.fadeIn('slow');
    },
    initialize: function(){
        this.model = new Backbone.Model({
            title: app.language[menu_visual_observ] || menu_visual_observ
        });
        this.controller = new Device();
    }

});