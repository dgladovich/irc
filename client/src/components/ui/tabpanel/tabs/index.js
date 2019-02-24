import { CollectionView } from 'backbone.marionette';
import Tab from './tab';

export default CollectionView.extend({
  tagName: 'ul',
  className: 'nav nav-pills',
  attributes: {
    role: 'tablist',
  },
  childView: Tab,
});
