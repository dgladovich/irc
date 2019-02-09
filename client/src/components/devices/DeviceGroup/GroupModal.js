import template from '../Device/templates/modal.jst';
import { View } from 'backbone.marionette';
import GroupModalStatuses from './GroupModalStatuses';

export default View.extend({
    template: template,
    events: {
        'click .btn-back': 'close'
    },
    regions: {
        body: {
            el: '.modal-body'
        }
    },
    close: function() {
        this.destroy();
    },
    onRender: function() {
        let devices = this.model.get('devices');
        this.showChildView('body', new GroupModalStatuses({ collection: devices }));
        this.$('.modal.fade').on('hidden.bs.modal', ()=>{
            this.destroy();
        })
    }
});