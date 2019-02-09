import template from './templates/service_jornal.jst';
import item_template from './templates/service_journal_item.jst';
import empty_item from './templates/journal_epmty_item.jst';
import {CollectionView, View, Model} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';

const serviceChannel = Radio.channel('servicechannel');

const EmptyItem = View.extend({
    template: empty_item,
    className: 'custom-table-row'
});

const JournalItem = View.extend({
    template: item_template,
    className: 'custom-table-row'
});

const JournalCollection = CollectionView.extend({
    childView: JournalItem,
    emptyView: EmptyItem,
    childViewOptions: function (model, index) {
        model.set({
            list_number: index + 1,
            date: moment(model.get('last_service')).format('DD-MM-YYYY'),
            time: moment(model.get('last_service')).format('HH:mm:ss'),
        });
        return {
            list_number: index + 1
        }
    },
});

export default View.extend({
    template: template,
    regions: {
        journal: '.custom-table-body'
    },
    onRender: function () {
        this.$el.fadeIn('slow');
        this.showChildView('journal', new JournalCollection({collection: this.collection}))
    },
    onBeforeDestroy: function () {
        this.$el.fadeOut('slow');
    },

    initialize: function () {
        this.collection = new Backbone.Collection();
        this.collection.url = function () {
            return '/to/servicejournal'
        };
        serviceChannel.on('service:done', () => {
            this.collection.reset();
            this.collection.fetch();
        });
        serviceChannel.on('update:journal', () => {
            this.collection.reset();
            this.collection.fetch();
        });
        this.collection.fetch();
    }

});