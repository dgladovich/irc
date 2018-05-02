import DefaultPanel from '../general/defpanel/DefaultPanel';
import template from '../general/templates/page.jst';
import BrokesPage from './BrokesPage';
import JournalTab from './JournalTab';
import {View, Model, CollectionView} from 'backbone.marionette';
import Radio from 'backbone.radio';

const channel = Radio.channel('network');
const alarm = Radio.channel('confirm');

const model = new Backbone.Model({
    title: 'Журнал событий'
});

export default View.extend({
    template: template,
    model: model,
    events: {
        'click #close-page': 'hidePage'
    },
    hidePage: function () {
        this.$el.fadeOut(500, () => {
            document.location.href = '#';
        });
    },
    regions: {
        visualbody: '.panel-container',
    },
    onRender: function () {
        this.showChildView('visualbody', new DefaultPanel({ collection: this.tabsContent }));
        this.$el.fadeIn('slow');
    },
    initialize: function () {
        this.tabsContent = new Backbone.Collection([
            {
                id: "brokes",
                view: BrokesPage,
                translate: app.language['current_brokes'] || `Текущие неисправности`
            },
            {
                id: "events",
                view: JournalTab,
                translate: app.language['events_journal'] || 'Журнал событий'
            }
        ]);
    }

});