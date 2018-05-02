import template from '../general/templates/modal.jst';
import { View } from 'backbone.marionette';
import DayService from './DayServices';

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
        this.showChildView('table', new DaySserv({ collection: this.model.get('faces') }))
        this.$('.modal.fade').on('hidden.bs.modal', ()=>{
            this.destroy();
        })
    }
});