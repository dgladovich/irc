import { View } from 'backbone.marionette';
import template from './tab.jst';
import './tab.scss';

export default View.extend({
  template,
  tagName: 'li',
  className: 'nav-item',
});
