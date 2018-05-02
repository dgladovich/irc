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
        /*        this.Works = new Works();
         this.Calendars = new Calendars({
         collection: app.devices
         });
         this.DevicesServicePage = new DevicesServicePage({
         collection: app.devices
         });
         this.ServiceJournal = new ServiceJournal();
         this.showChildView('visualbody', new TabPanel({collection: collection}));
         this.$('#devser').append(this.DevicesServicePage.render().el);
         this.$('#journal').append(this.ServiceJournal.render().el);
         this.$('#works').append(this.Works.render().el);
         this.$('#calendar').append(this.Calendars.render().el);*/
        this.showChildView('tabpanel', new DefaultPanel({collection: this.tabsContent}));
        this.$el.fadeIn('slow');
    },
    initialize: function () {
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