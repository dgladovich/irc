import template from './templates/service_materials.jst';
import { View, Model } from 'backbone.marionette';
import accounting from 'accounting';

export default View.extend({
    template: template,
    className: 'custom-table-row',
    onRender: function() {},
    initialize: function () {
        this.model.set({
            totalPrice: accounting.toFixed(this.model.get('price') /** this.model.get('count')*/, 2)
        })
    }
});
