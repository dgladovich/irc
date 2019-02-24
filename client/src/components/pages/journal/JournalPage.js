import { View, Model, CollectionView } from 'backbone.marionette';
import Radio from 'backbone.radio';
import { t } from 'i18next';

import DefaultPanel from '../general/defpanel/DefaultPanel';
import template from '../general/templates/page.jst';
import BrokesPage from './BrokesPage';
import JournalTab from './JournalTab';

const channel = Radio.channel('network');
const alarm = Radio.channel('confirm');
const menu_event_journal = 'menu_event_journal'; const
  menu_brokes_journal = 'menu_brokes_journal';

export default View.extend({
  template,
  events: {
    'click #close-page': 'hidePage',
  },
  hidePage() {
    this.$el.fadeOut(500, () => {
      document.location.href = '#';
    });
  },
  regions: {
    visualbody: '.panel-container',
  },
  onRender() {
    this.showChildView('visualbody', new DefaultPanel({ collection: this.tabsContent }));
    this.$el.fadeIn('slow');
  },
  initialize() {
    this.model = new Backbone.Model({
      title: t('menu_event_journal'),
    });
    this.tabsContent = new Backbone.Collection([
      {
        id: 'brokes',
        view: BrokesPage,
        translate: t('menu_brokes_journal'),
      },
      {
        id: 'events',
        view: JournalTab,
        translate: t('menu_event_journal'),
      },
    ]);
  },

});
