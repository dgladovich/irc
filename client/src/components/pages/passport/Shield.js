import { View, Model } from 'backbone.marionette';
import template from './templates/shield.jst';


export default View.extend({
  template,
  onBeforeRender() {

  },
  initialize() {
    this.model = app.controller.get('pass');
  },
});
