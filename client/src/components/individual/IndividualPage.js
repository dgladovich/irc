import { View, Model } from 'backbone.marionette';
import template from './templates/individual.jst';
import { setWrapHeightN } from '../../Utils';


export default View.extend({
  template,
  events: {
    'click #close-page': 'hidePage',
  },
  regions: {
    controllers: '.row',
  },
  hidePage() {
    this.$el.fadeOut(500, () => {
      document.location.href = '#';
    });
  },
  onRender() {
    	this.$el.fadeIn('slow');
    	setWrapHeightN(this.$('.t-wrap'));
  },
});
