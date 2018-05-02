import Devices from './Devices';
import template from '../general/templates/page.jst';
import { View, Model } from 'backbone.marionette';

const model = new Backbone.Model({
    title: 'Список устройств'
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
/*    onDestroy: function() {
        this.devices.destroy();
        this.groups.destroy();
    },*/
    onRender: function() {
        this.showChildView('content', new Devices({ collection: this.devices }));
        this.$el.fadeIn('slow')


    },
    initialize: function(opt) {
        this.devices = opt.data;
    }

});