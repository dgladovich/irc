import TabPanel from '../general/tabpanel/TabPanel';
import template from '../general/templates/page.jst';
import {View, Model} from 'backbone.marionette';
import Works from './Works';
import DefaultPanel from '../general/defpanel/DefaultPanel';
import Calendars from './Calendars';
import DevicesServicePage from './DevicesServicePage';
import ServiceJournal from './ServiceJournal';

const model = new Backbone.Model({
    title: 'Техническое обслуживание'
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
        tabpanel: '.panel-container'
    },
    onRender: function () {
        this.showChildView('tabpanel', new DefaultPanel({collection: this.tabsContent}));
        this.$el.fadeIn('slow');
    },
    initialize: function () {
        let deviceServices = new Backbone.Collection();
        deviceServices.url = '/'
        this.tabsContent = new Backbone.Collection([
            {
                id: "calendar",
                translate: app.language['passport_shield'] || `Календарь ТО`,
                view: Calendars
            },
            {
                id: "devser",
                translate: app.language['passport_shield'] || `Техническое обслуживание`,
                view: DevicesServicePage
            },
            {
                id: 'journal',
                translate: app.language['passport_shield'] || `Журнал ТО`,
                view: ServiceJournal
            }
        ]);
    }

});