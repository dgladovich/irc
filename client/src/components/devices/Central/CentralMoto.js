import template from './templates/motovar.jst';

import { View } from 'backbone.marionette';

export default View.extend({
    template: template,
    className: 'modal-motovar',
    onRender: function() {
        this.updateMoto.call(this);
    },
    updateMoto: function() {
        this.$('.motovars').html(`Моточасы: ${this.model.get('moto')} час(ов)`);
    },
    initialize: function() {
        this.listenTo(this.model, 'change:moto', this.updateMoto.bind(this));

    }
});