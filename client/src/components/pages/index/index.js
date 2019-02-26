import { View } from 'backbone.marionette';
import template from './main.jst';
import Menu from './menu';
import './index.scss';

export default View.extend({
  template,
  className: 'main-page',
  regions: {
    menu: '.menu',
  },
  onRender() {
    this.showChildView('menu', new Menu({ model: this.model }));
  },
});
