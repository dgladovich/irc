import { View, Model } from 'backbone.marionette';
import ControllPanel from './ControllPanel';
import template from '../general/templates/page.jst';

const tit_ctr = 'tit_ctr';

export default View.extend({
  template,
  events: {
    'click #close-page': 'hidePage',
  },
  hidePage() {
    this.$el.fadeOut(500, () => {
      document.location.href = '#';
    });
  },
  regions: {
    content: '.panel-container',
  },
  onRender() {
    this.showChildView('content', new ControllPanel());
    this.$el.fadeIn('slow');
  },
  initialize() {
    this.model = new Backbone.Model({
      title: app.language[tit_ctr] || tit_ctr,
    });
  },

});
