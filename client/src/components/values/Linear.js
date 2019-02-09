import { View, Model } from 'backbone.marionette';
import radialTemplate from './templates/linear.jst';

export default View.extend({
  template: radialTemplate,
  onBeforeRender() {
    this.updateLinear(this);
  },
  onDestroy() {
    this.stopListening();
  },
  calculatePercent() {
    const percent = 100 / this.model.get('max_val');


    let linear_val = this.model.get('def') * percent;


    const linear_alert = this.model.get('lim_warning') * percent;


    const linear_danger = this.model.get('lim_danger') * percent;
    linear_val = linear_val > 100 ? 100 : linear_val;
    this.model.set({
      linear_val,
      linear_alert,
      linear_danger,
    });
  },
  countStatus() {
    const def = this.model.get('def');


    const warning = this.model.get('lim_warning');


    const danger = this.model.get('lim_danger');


    if (def >= warning && def < danger) {
      this.previousClass = 'att';
    } else if (def >= danger) {
      this.previousClass = 'danger';
    } else {
      this.previousClass = '';
    }
  },
  updateLinear() {
    const linear = this.$('.item');
    linear.removeClass(this.previousClass);
    this.calculatePercent();
    this.countStatus();
    this.$('.value').css({ width: `${this.model.get('linear_val')}%` });
    this.$('.item-value').html(this.model.get('def'));
    linear.addClass(this.previousClass);
  },
  onRender() {
    // Get rid of that pesky wrapping-div.
    // Assumes 1 child element present in template.
    this.$el = this.$el.children();
    // Unwrap the element to prevent infinitely
    // nesting elements during re-render.
    this.$el.unwrap();
    this.setElement(this.$el);
    this.updateLinear.call(this);
  },
  initialize() {
    this.previousClass = '';
    this.listenTo(this.model, 'change:def', this.updateLinear.bind(this));
  },
});
