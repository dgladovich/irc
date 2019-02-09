import Devices from './Devices';
import template from '../general/templates/page.jst';
import { View, Model } from 'backbone.marionette';
const page_device_list = 'page_device_list';

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
/*    onDestroy: function() {
        this.devices.destroy();
        this.groups.destroy();
    },*/
    onRender: function() {
        this.showChildView('content', new Devices({ collection: this.devices }));
        this.$el.fadeIn('slow')


    },
    initialize: function(opt) {
        this.model = new Backbone.Model({
            title: app.language[page_device_list] || page_device_list
        });
        this.devices = opt.data;
    }

});
