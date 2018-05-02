import Marionette from 'backbone.marionette';
import template from './templates/messages.jst';
import Modal from './Modal';
import Radio from 'backbone.radio';
import FilterModel from '../../models/JournalFilterModel';

const alarm = Radio.channel('alarm');
const model = new FilterModel();

export default Marionette.View.extend({
    template: template,
    collection: new Backbone.Collection(),
    filterModel: new FilterModel(),
    events: {
        'click': 'showMessageModal'
    },
    showMessageModal: function() {
        let modal = new Modal({ model: this.model, collection: this.collection })
        $('body').append(modal.render().el);
        modal.$('.modal.fade').modal('show')

    },
    updateCount: function() {
        this.$el.removeClass(this.previousClass);

        if (this.collection.length) {
            this.previousClass = 'danger';
        } else {
            this.previousClass = '';
        }
        this.$('.msg-qtty').html(this.collection.length);
        this.$el.addClass(this.previousClass);
        return this;
    },
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
    },
    initialize: function() {
        this.previousClass = '';
        this.model = new Backbone.Model({
            name: 'Сообщения'
        });
        this.collection = app.alarms;
        this.listenTo(this.collection, 'remove', this.updateCount.bind(this));
        this.listenTo(this.collection, 'add', this.updateCount.bind(this));
        this.listenTo(this.collection, 'reset', this.updateCount.bind(this));
    }
});