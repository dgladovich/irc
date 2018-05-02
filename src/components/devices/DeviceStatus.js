import template from './Device/templates/status.jst';
import errocode_template from './Device/templates/errorcode_template.jst';

import { View } from 'backbone.marionette';

const ErrorCodeView = View.extend({
    template: errocode_template,
    initialize: function(){
        this.listenTo(this.model, 'change:id', this.render.bind(this))
    }
})
const ErrorCodeModel = Backbone.Model.extend({
    initialize: function() {
        this.set(app.errors.findWhere({
            id: this.get('dev').get('ecode')
        }).toJSON());
        this.listenTo(this.get('dev'), 'change:ecode', (dev) => {
            this.set(app.errors.findWhere({
                id: this.get('dev').get('ecode')
            }).toJSON());
        })
    }
})

export default View.extend({
    template: template,
    regions: {
        errorMessage: '.panel-body'
    },
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        this.updateStatus.call(this);
        this.showChildView('errorMessage', this.errorCodeView);
    },
    updateStatus: function() {
        let title = this.$('.panel-title');
        title.removeClass(this.previousClass);
        let deviceStatus = app.statuses.findWhere({ id: this.model.get('sgrp')}).get('sgrps_opts').findWhere({num: this.model.get('stat')});
        if (deviceStatus !== undefined) {
            this.previousClass = deviceStatus.get('dclass');
        } else {
            this.previousClass = 'off';
            console.log('Get wrong status; Device' + this.model.get('id') + '; Status:' + this.model.get('stat') + '; Group:' + this.model.get('sgrp'))
        }

        this.$('.text-center').html(deviceStatus.get('trans'));
        title.addClass(this.previousClass);
    },
    onDestroy: function() {
        this.stopListening();
    },
    initialize: function() {
        this.errorCodeView = new ErrorCodeView({ model: new ErrorCodeModel({ dev: this.model }) });
        this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this))
        //this.errorCodeView.listenTo(this.model, 'change:ecode', this.errorCodeView.render.bind(this.errorCodeView));

    }
});