import { View, CollectionView, Model } from 'backbone.marionette';
import template from './templates/servicescollection.jst';
import Service from './Service';


 const ServicesCollection = CollectionView.extend({
    childView: Service,
     comparator: function(item){
        return item.get('ser_num')
     }
});


export default View.extend({
    template: template,
    regions: {
        services: '#services'
    },
    onRender: function(){
        this.showChildView('services', new ServicesCollection({
            collection: this.collection
        }))
    }
})