
import { View, CollectionView } from 'backbone.marionette';
import _ from 'underscore';
import head from './head.jst';

const Column = View.extend({
  template: head,
});

export default CollectionView.extend({
  childView: Column,
});
