import template from './templates/modal.jst';

import { View } from 'backbone.marionette';
import DeviceValues from './DeviceValues';
import DeviceStatus from './DeviceStatus';

export default View.extend({
    template: template,
    events: {
        'click .btn-back': 'close'
    },
    regions: {
        values: {
            el: '.values'
        },
        status: {
            el: '.status'
        }
    },
    close: function() {
        this.destroy();
    },
    onRender: function() {
        this.showChildView('values', new DeviceValues({ collection: this.model.get('faces') }))
        this.showChildView('status', new DeviceStatus({ model: this.model }));
       /* this.$('.modal-body tbody').prepend(new DeviceStatus({ model: this.model }).render().el)
        this.$('.modal.fade').on('hidden.bs.modal', ()=>{
            this.destroy();
        })*/
    }
});