import TabPanel from '../general/tabpanel/TabPanel';
import template from '../general/templates/page.jst';
import {View, Model} from 'backbone.marionette';

import DefaultPanel from '../general/defpanel/DefaultPanel';
import Shield from './Shield';
import Passport from './Passport';
import PickingList from './PickingList';
import Instruction from './Instruction';

const model = new Backbone.Model({
    title: 'Паспорт оборудования'
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
        tabs: '.panel-container'
    },
    onRender: function () {
        /*        let height = $(window).height() - (30 * $(window).height() / 100);
         let device = app.devices.findWhere({parent: 0});
         this.showChildView('visualbody', new TabPanel({collection: collection}));
         if (device.get('passportdata')) {
         this.$('#shield').html(new Shield({model: device}).render().el);
         this.$('#pickinglist').html(new PickingList({model: device}).render().el);
         }
         this.$('#passport').html(new Passport({model: device}).render().el);
         this.$('#instruction').html(new Instruction({model: device}).render().el);
         this.$('.tab-pane').each((i, pane) => {
         if ($(pane).attr('id') !== 'shield') {
         $(pane).height(height);
         }

         })
         this.$el.fadeIn('slow');*/
        this.showChildView('tabs', new DefaultPanel({ collection: this.tabsContent }));
    },
    initialize: function () {
        /*        this.tabPanel = new TabPanel({
         collection: this.viewGroups,
         });*/
        this.tabsContent = new Backbone.Collection([
            {
                id: "shield",
                view: Shield,
                translate: app.language['passport_shield'] || `Шильдик`
            },
            {
                id: "passport",
                view: Passport,
                translate: app.language['passport_page'] || 'Паспорт'
            },
            {
                id: "picking_list",
                view: PickingList,
                translate: app.language['picking_list_page'] || 'Комплектовочная ведомость'
            },
            {
                id: "instruction_page",
                view: Instruction,
                translate: app.language['instruction_page_'] || 'Инструкция по эксплуатации'
            },
        ]);
    }

});