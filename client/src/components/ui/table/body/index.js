import { View, CollectionView } from 'backbone.marionette';
import template from './row.jst';
import './body.scss';

const Row = View.extend({
  template,
  className: 'table-body-row',
});

export default CollectionView.extend({
  childView: Row,
  className: 'table-default-body',
  buildChildView(child, ChildViewClass) {
    child.set('columns', this.getOption('columns'));
    const view = new ChildViewClass({ model: child });
    return view;
  },
});
