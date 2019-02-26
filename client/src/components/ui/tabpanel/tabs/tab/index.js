import { View } from 'backbone.marionette';
import template from './tab.jst';
import './tab.scss';

export default View.extend({
  template,
  tagName: 'li',
  attributes: {
    role: 'presentation',
  },
  className: 'pill-li',
  replaceElement: true,
});
