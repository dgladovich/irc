import { CollectionView } from 'backbone.marionette';
import TabContent from './tabcontent';

export default CollectionView.extend({
  childView: TabContent,
  className: 'tab-content device-meas-list',
});
