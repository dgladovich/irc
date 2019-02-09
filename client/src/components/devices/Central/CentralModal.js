import template from '../Device/templates/modal.jst';

import { View } from 'backbone.marionette';

import Motovars from './CentralMoto';

export default View.extend({
    template: template,
    events: {
        'click .btn-back': 'close'
    },
    regions: {
        moto: {
            el: '.modal-body'
        }
    },
    close: function() {
        this.destroy();
    },
    onRender: function() {
        this.showChildView('moto', new Motovars({ model: this.model }))

        this.$('.modal.fade').on('hidden.bs.modal', ()=>{
            this.destroy();
        })
    }
});