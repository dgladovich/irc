import { View, Model } from 'backbone.marionette';
import template from './templates/equiplist.jst';
import 'owl.carousel';

export default View.extend({
  template,
  onRender() {
    this.$('.owl-carousel').owlCarousel({
      dots: true,
      onChanged: () => {
        this.$el.css('opacity', 1);
      },
    });
  },
});
