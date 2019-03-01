import { View } from 'backbone.marionette';
import Tab from 'bootstrap/js/src/tab';
import template from './tab.jst';
import './tab.scss';

export default View.extend({
  template,
  tagName: 'li',
  className: 'pill-li',
  events: {
    click: 'toggleTag',
  },
  attributes: {
    role: 'presentation',
  },
  toggleTag() {
    console.log(Tab)
  },

});
