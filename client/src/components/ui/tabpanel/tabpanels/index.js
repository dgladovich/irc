import { CollectionView } from 'backbone.marionette';
import TabContent from './tabcontent';

export default CollectionView.extend({
  childView: TabContent,
  className: 'tab-content device-meas-list',
  buildChildView(child, ChilViewClass, options) {
    const view = new ChilViewClass({
      model: child,
      attributes: {
        id: child.get('id'),
        role: 'tabpanel',
      },
    });
    return view;
  },
});
