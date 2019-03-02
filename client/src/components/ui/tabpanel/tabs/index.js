import { CollectionView } from 'backbone.marionette';
import Tab from './tab';
import './tabs.scss';

export default CollectionView.extend({
  tagName: 'ul',
  className: 'nav nav-pills',
  attributes: {
    id: 'pills-tab',
    role: 'tablist',
  },
  childView: Tab,
});
