import template from './templates/modal.jst';
import { View, Model } from 'backbone.marionette';
import ChartsCollection from './ChartsCollection';
export default View.extend({
    template: template,
    events: {
        'click .back-top-button': 'hidePage'
    },
    hidePage: function() {

        document.location.href = '#';

    },
    regions: {
        content: {
            el: '.modal-body'
        }
    },
    onRender: function(){
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        this.showChildView('content', new ChartsCollection({collection: app.faces}));
        this.$('.modal.fade').on('hidden.bs.modal', ()=>{
            this.destroy();
        })
    },

});