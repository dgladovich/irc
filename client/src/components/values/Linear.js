import { View, Model } from 'backbone.marionette';
import radialTemplate from './templates/linear.jst';

export default View.extend({
    template: radialTemplate,
    onBeforeRender: function() {
        this.updateLinear(this);
    },
    onDestroy: function() {
        this.stopListening();
    },
    calculatePercent: function() {
        let percent = 100 / this.model.get('max_val'),
            linear_val = this.model.get('def') * percent,
            linear_alert = this.model.get('lim_warning') * percent,
            linear_danger = this.model.get('lim_danger') * percent;
        linear_val = linear_val > 100 ? 100 : linear_val;
        this.model.set({
            linear_val: linear_val,
            linear_alert: linear_alert,
            linear_danger: linear_danger,
        });
    },
    countStatus: function() {
        let def = this.model.get('def'),
            warning = this.model.get('lim_warning'),
            danger = this.model.get('lim_danger');


        if (def >= warning && def < danger) {
            this.previousClass = 'att';
        } else if (def >= danger) {
            this.previousClass = 'danger';
        } else {
            this.previousClass = '';
        }
    },
    updateLinear: function() {
        let linear = this.$('.item');
        linear.removeClass(this.previousClass);
        this.calculatePercent();
        this.countStatus();
        this.$('.value').css({ width: this.model.get('linear_val') + '%' });
        this.$('.item-value').html(this.model.get('def'))
        linear.addClass(this.previousClass);
    },
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        this.updateLinear.call(this);
    },
    initialize: function() {
        this.previousClass = '';
        this.listenTo(this.model, 'change:def', this.updateLinear.bind(this));
    }
});