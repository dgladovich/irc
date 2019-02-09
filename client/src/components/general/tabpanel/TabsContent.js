import { CollectionView } from 'backbone.marionette';
import TabContent from './TabContent';

export default CollectionView.extend({
  childView: TabContent,
  className: 'tab-content device-meas-list',
});
