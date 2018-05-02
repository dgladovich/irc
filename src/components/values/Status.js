import { View, Model } from 'backbone.marionette';
import template from './templates/status.jst';

export default View.extend({
    template: template,
    onDestroy: function() {
        this.stopListening();
    },
    onBeforeRender: function() {},
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        this.updateStatus.call(this);
    },
    updateStatus: function() {
        let indicator = this.$('.item');
        let valueStatus = app.statuses.findWhere({ id: this.model.get('stat_grp')}).get('sgrps_opts').findWhere({num: this.model.get('def')});
        indicator.removeClass(this.previousClass);

        if (valueStatus !== undefined) {
            this.previousClass = valueStatus.get('dclass');
            this.$('.status-name').html(valueStatus.get('translate'));
        } else {
            this.previousClass = 'off';
            console.log('Get wrong status; Value' + this.model.get('id') + '; Value' + this.model.get('name') + '; Status:' + this.model.get('def') + '; Group:' + this.model.get('stat_grp'))
        }

        indicator.addClass(this.previousClass);
    },
    initialize: function() {
        this.previousClass = '';
        this.listenTo(this.model, 'change:def', this.updateStatus.bind(this))
    }
});