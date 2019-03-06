
import { View, CollectionView } from 'backbone.marionette';
import _ from 'underscore';
import template from './head.jst';
import './head.scss';

export default View.extend({
  template,
  className: 'table-default-head',
});
