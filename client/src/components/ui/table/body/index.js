import { View, CollectionView } from 'backbone.marionette';

const Column = View.extend({
  template: '<div class="table-body-column"><%= value %></div>',
});
const Row = CollectionView.extend({
  childView: Column,
});

export default View.extend({
  template: '<div class="table-body-row"></div>',
  regions: {
    row: '.table-body-row',
  },
  onRender() {
    this.showChildView('row', new Row({ collection: this.collection }));
  },
});
