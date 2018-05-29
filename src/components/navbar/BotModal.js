import template from './templates/botmodal.jst';
import { View } from 'backbone.marionette';
import Radio from 'backbone.radio';
import Analitics from './Analitics';
const bot = Radio.channel('bot');

export default View.extend({
    template: template,
    events: {
        'click .btn-back': 'close'
    },
    regions: {
        analitics: {
            el: '.modal-body'
        }
    },
    close: function() {
        this.destroy();
    },
    onRender: function() {
        this.showChildView('analitics', new Analitics());

        this.$('#status-uzel1').on('hidden.bs.modal', ()=>{
            this.destroy.bind(this)
        });
    }
});