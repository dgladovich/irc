import template from './templates/devser.jst';
import { View, Model } from 'backbone.marionette';
import ServicesCollection from './ServicesCollection';
import Repair from './Repair';

const DeviceServiceCollection = Backbone.Collection.extend({
   comparator: function(item){
       return item.get('ser_num');
   }
});

export default View.extend({
    template: template,
    regions: {
        services: {
            el: '#services'
        },
        repair: {
            el: '#repair'
        },
    },

    onRender: function() {
        this.showChildView('services', new ServicesCollection({
            collection: new DeviceServiceCollection(this.model.get('service'))
        }));
        this.showChildView('repair', new Repair({
            model: this.model
        }));
    },
    initialize: function(){
        if(this.model.get('service').length === 0){
            this.destroy();
        }
    }



});