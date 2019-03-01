import { View, Model } from 'backbone.marionette';
import template from './radial.jst';

export default View.extend({
  template,
  className: 'col-xs-12 col-sm-4 col-lg-4',
  onBeforeRender() {
    this.updateRadial.call(this);
  },
  onDestroy() {
    this.stopListening();
  },
  calculateDegree() {
    const degree = 180 / 100;


    const percent = 100 / this.model.get('max_val');


    let def_degree = this.model.get('def') * 100 / this.model.get('max_val') * degree;

    if (def_degree > 180) {
      def_degree = 180;
    }
    this.model.set({
      degree_alert: this.model.get('lim_warning') * degree * percent,
      def_degree: +def_degree,
      // degree_warning: this.model.get('lim_warning') * degree * percent,
      degree_danger: this.model.get('lim_danger') * degree * percent,
      degree_max: this.model.get('max_val') * degree,
    });
  },
  countStatus() {
    const def = this.model.get('def_degree');


    const warning = this.model.get('degree_alert');


    const danger = this.model.get('degree_danger');


    if (this.model.get('invert')) {
      if (def <= warning && def > danger) {
        this.previousClass = 'att';
      } else if (def <= danger) {
        this.previousClass = 'danger';
      } else {
        this.previousClass = '';
      }
    } else if (def >= warning && def < danger) {
      this.previousClass = 'att';
    } else if (def >= danger) {
      this.previousClass = 'danger';
    } else {
      this.previousClass = '';
    }
  },
  updateRadial() {
    this.$('.item').removeClass(this.previousClass);
    this.calculateDegree.call(this);
    this.$('svg.radial-stroke').css({ transform: `rotate(${this.model.get('def_degree')}deg)` });
    this.countStatus.call(this);
    this.$('.radial-value').html(`${this.model.get('def')} ${this.model.get('translate')}`);
    this.$('.item').addClass(this.previousClass);
  },
  onRender() {
    this.updateRadial.call(this);
  },
  initialize() {
    this.previousClass = '';
    this.listenTo(this.model, 'change:def', this.updateRadial.bind(this));
  },
});
