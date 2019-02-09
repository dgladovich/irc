import template from './templates/modal.jst';

import { View } from 'backbone.marionette';
import Table from './ModalTable';
import DeviceStatus from './DeviceStatus';

export default View.extend({
    template: template,
    events: {
        'click .btn-back': 'close'
    },
    regions: {
        table: {
            el: '.modal-body'
        }
    },
    close: function() {
        this.destroy();
    },
    onRender: function() {
        this.showChildView('table', new Table({ collection: this.model.get('faces') }))
        this.$('.modal-body tbody').prepend(new DeviceStatus({ model: this.model }).render().el)
        this.$('.modal.fade').on('hidden.bs.modal', ()=>{
            this.destroy();
        })
    }
});