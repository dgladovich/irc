import { View, Model } from 'backbone.marionette';
import { t } from 'i18next';

import TabPanel from '../general/tabpanel/TabPanel';
import template from '../general/templates/page.jst';
import Works from './Works';
import DefaultPanel from '../general/defpanel/DefaultPanel';
import Calendars from './Calendars';
import DevicesServicePage from './DevicesServicePage';
import ServiceJournal from './ServiceJournal';

const model = new Backbone.Model({
  title: 'Техническое обслуживание',
});

export default View.extend({
  template,
  model,
  events: {
    'click #close-page': 'hidePage',
  },
  hidePage() {
    this.$el.fadeOut(500, () => {
      document.location.href = '#';
    });
  },
  regions: {
    tabpanel: '.panel-container',
  },
  onRender() {
    this.showChildView('tabpanel', new DefaultPanel({ collection: this.tabsContent }));
    this.$el.fadeIn('slow');
  },
  initialize() {
    app.services.url = '/to/services';
    if (app.services.length === 0) {
      app.services.fetch();
    }
    this.tabsContent = new Backbone.Collection([
      {
        id: 'calendar',
        translate: t('passport_shield'),
        view: Calendars,
      },
      {
        id: 'devser',
        translate: t('passport_shield'),
        view: DevicesServicePage,
      },
      {
        id: 'journal',
        translate: t('passport_shield'),
        view: ServiceJournal,
      },
    ]);
  },

});
