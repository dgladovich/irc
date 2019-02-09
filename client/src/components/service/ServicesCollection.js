import { View, CollectionView, Model } from 'backbone.marionette';
import template from './templates/servicescollection.jst';
import Service from './Service';


const ServicesCollection = CollectionView.extend({
  childView: Service,
  comparator(item) {
    return item.get('ser_num');
  },
});


export default View.extend({
  template,
  regions: {
    services: '#services',
  },
  onRender() {
    this.showChildView('services', new ServicesCollection({
      collection: this.collection,
    }));
  },
});
