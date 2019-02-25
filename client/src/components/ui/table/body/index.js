import { View, CollectionView } from 'backbone.marionette';
import template from './row.jst';

const Row = View.extend({
  template,
});

export default CollectionView.extend({
  childView: Row,
  buildChildView(child, ChildViewClass) {
    child.set('columns', this.getOption('columns'));
    const view = new ChildViewClass({ model: child });
    return view;
  },
});
