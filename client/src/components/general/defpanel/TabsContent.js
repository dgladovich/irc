import { CollectionView } from 'backbone.marionette';
import TabContent from './TabContent';

export default CollectionView.extend({
  childView: TabContent,
  className: 'tab-content controller-meas-list',
  buildChildView(child, ChildViewClass, childViewOptions) {
    const options = { model: new Backbone.Model({ id: child.get('id') }), view: child.get('view') };
    const view = new ChildViewClass(options);
    return view;
  },
});
