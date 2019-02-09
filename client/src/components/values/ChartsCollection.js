import { CollectionView, View } from 'backbone.marionette';
import Chart from './Chart';
import template from './templates/chartlist.jst';

const Charts = CollectionView.extend({
  childView: Chart,
});
export default View.extend({
  template,
  regions: {
    content: '.chartlist',
  },

  onRender() {
    const collection = this.collection.filter(face => face.get('viewtype') !== 0 && !!face.get('history_fix'));
    this.showChildView('content', new Charts({ collection: new Backbone.Collection(collection) }));
  },
});
