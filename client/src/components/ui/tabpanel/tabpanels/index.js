import { CollectionView } from 'backbone.marionette';
import TabContent from './tabcontent';

export default CollectionView.extend({
  childView: TabContent,
  className: 'tab-content device-meas-list',
  buildChildView(child, ChilViewClass, options) {
    const view = new ChilViewClass({
      model: child,
      attributes: {
        id: `pills-${child.get('id')}`,
        role: 'tabpanel',
        'aria-labelledby': `pills-${child.get('id')}-tab`,
      },
    });
    return view;
  },
});
