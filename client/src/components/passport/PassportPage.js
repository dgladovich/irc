import { View, Model } from 'backbone.marionette';
import TabPanel from '../general/tabpanel/TabPanel';
import template from '../general/templates/page.jst';

import DefaultPanel from '../general/defpanel/DefaultPanel';
import Shield from './Shield';
import Passport from './Passport';
import PickingList from './PickingList';
import Instruction from './Instruction';

const menu_device_passport = 'menu_device_passport'; const tit_plists = 'tit_plists'; const tit_shield = 'tit_shield'; const tit_passport = 'tit_passport'; const
  tit_instruction = 'tit_instruction';

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
    tabs: '.panel-container',
  },
  onRender() {
    /*        let height = $(window).height() - (30 * $(window).height() / 100);
         let controller = app.devices.findWhere({parent: 0});
         this.showChildView('visualbody', new TabPanel({collection: collection}));
         if (controller.get('passportdata')) {
         this.$('#shield').html(new Shield({model: controller}).render().el);
         this.$('#pickinglist').html(new PickingList({model: controller}).render().el);
         }
         this.$('#passport').html(new Passport({model: controller}).render().el);
         this.$('#instruction').html(new Instruction({model: controller}).render().el);
         this.$('.tab-pane').each((i, pane) => {
         if ($(pane).attr('id') !== 'shield') {
         $(pane).height(height);
         }

         })
         this.$el.fadeIn('slow'); */
    this.showChildView('tabs', new DefaultPanel({ collection: this.tabsContent }));
  },
  initialize() {
    /*        this.tabPanel = new TabPanel({
         collection: this.viewGroups,
         }); */
    this.model = new Backbone.Model({
      title: app.language[menu_device_passport] || menu_device_passport,
    });
    this.tabsContent = new Backbone.Collection([
      {
        id: 'shield',
        view: Shield,
        translate: app.language[tit_shield] || tit_shield,
      },
      {
        id: 'passport',
        view: Passport,
        translate: app.language[tit_passport] || tit_passport,
      },
      {
        id: 'picking_list',
        view: PickingList,
        translate: app.language[tit_plists] || tit_plists,
      },
      {
        id: 'instruction_page',
        view: Instruction,
        translate: app.language[tit_instruction] || tit_instruction,
      },
    ]);
  },

});
