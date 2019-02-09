import { View, Model } from 'backbone.marionette';
import template from './templates/radial.jst';

export default View.extend({
    template: template,
    onBeforeRender: function() {
        this.updateRadial.call(this);
    },
    onDestroy: function() {
        this.stopListening();
    },
    calculateDegree: function() {
        let degree = 180 / 100,
            percent = 100 / this.model.get('max_val'),
            def_degree = this.model.get('def') * 100 / this.model.get('max_val') * degree;

        if (def_degree > 180) {
            def_degree = 180;
        }
        this.model.set({
            degree_alert: this.model.get('lim_warning') * degree * percent,
            def_degree: +def_degree,
            //degree_warning: this.model.get('lim_warning') * degree * percent,
            degree_danger: this.model.get('lim_danger') * degree * percent,
            degree_max: this.model.get('max_val') * degree
        });

    },
    countStatus: function() {
        let def = this.model.get('def_degree'),
            warning = this.model.get('degree_alert'),
            danger = this.model.get('degree_danger');


        if (this.model.get('invert')) {
            if (def <= warning && def > danger) {
                this.previousClass = 'att';
            } else if (def <= danger) {
                this.previousClass = 'danger';
            } else {
                this.previousClass = '';
            }
        } else {
            if (def >= warning && def < danger) {
                this.previousClass = 'att';
            } else if (def >= danger) {
                this.previousClass = 'danger';
            } else {
                this.previousClass = '';
            }
        }

    },
    updateRadial: function() {
        this.$('.item').removeClass(this.previousClass);
        this.calculateDegree.call(this);
        this.$('svg.radial-stroke').css({ transform: 'rotate(' + this.model.get('def_degree') + 'deg)' });
        this.countStatus.call(this);
        this.$('.radial-value').html(this.model.get('def') + ' ' + this.model.get('translate'));
        this.$('.item').addClass(this.previousClass)
    },
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        this.updateRadial.call(this);
    },
    initialize: function() {
        this.previousClass = '';
        this.listenTo(this.model, 'change:def', this.updateRadial.bind(this))
    }
});