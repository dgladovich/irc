import { CollectionView } from 'backbone.marionette';
import TabContent from './TabContent';

export default CollectionView.extend({
  childView: TabContent,
  className: 'tab-content controller-meas-list',
  buildChildView(child, ChildViewClass, childViewOptions) {
    const options = _.extend({ model: child }, { view: this.passView, viewKey: this.viewKey });
    const view = new ChildViewClass(options);
    return view;
  },
  initialize(opt) {
    this.passView = opt.view;
    this.viewKey = opt.viewKey;
  },
});
