import { View, Model } from 'backbone.marionette';
import template from './templates/value.jst';

export default View.extend({
    template: template,
    onDestroy: function() {
        this.stopListening();
    },
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        this.updateValue.call(this);
    },
    updateValue: function() {
        this.$('.status').html(this.model.get('def'));
        this.updateStatus.call(this);
    },
    updateStatus: function() {
        let indicator = this.$('.item');
        let status = app.statuses.findWhere({
            grp: this.model.get('stat_grp'),
            num: this.model.get('def')
        });

        indicator.removeClass(this.previousClass);

        if (status !== undefined) {
            switch (status.get('clr')) {
                case "#c7c7c9":
                    {
                        this.previousClass = '';
                        break;
                    }
                case "#e12c0d":
                    {

                        this.previousClass = 'danger';

                        break;
                    }
                case "lime":
                case "#0db800":
                    {
                        this.previousClass = 'active';
                        break;
                    }
                default:
                    {
                        this.previousClass = 'off';
                        break;
                    }
            }

        }

        indicator.addClass(this.previousClass);
    },
    initialize: function() {
        this.previousClass = '';
        this.listenTo(this.model, 'change:def', this.updateValue.bind(this));
    }
});