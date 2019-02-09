import template from './templates/group_modal.jst';

import { View } from 'backbone.marionette';
import Table from './GroupModalTable';
//import ValueTable from './GroupModalValueTable';

export default View.extend({
    template: template,
    events: {
        'click .btn-back': 'close'
    },
    regions: {
        statuses: {
            el: '.modal-statuses'
        },        
        values: {
            el: '.modal-values'
        }
    },
    close: function(){
        this.destroy();
    },
    onRender: function(){
        this.showChildView('statuses', new Table({collection: this.model.get('devices')}), this.model.toJSON());
        //this.showChildView('values', new ValueTable({collection: this.model.get('devices')}), this.model.toJSON());

    }
});