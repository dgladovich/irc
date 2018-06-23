import { View, Model } from 'backbone.marionette';
import TabPanel from '../general/tabpanel/TabPanel';
import CustomPanel from '../general/panel/CustomPanel';
import Measurments from './Measurments';
import ValvesView from './ValvesView';
import template from '../general/templates/page.jst';
import ChartModal from './ChartModal';

const button_charts = 'button_charts', menu_current_values = 'menu_current_values';

export default View.extend({
    template: template,
    events: {
        'click #close-page': 'hidePage'
    },
    hidePage: function() {
        this.$el.fadeOut(500, ()=>{
            document.location.href = '#';
        });
    },
    showChartModal: function(){
        let modal = new ChartModal();
        modal.render().$el.modal('show');
        $('body').append(modal.el);
        modal.$el.on('hidden.bs.modal', ()=>{
            modal.destroy();
        })
    },
/*    onDestroy: function() {
        this.measurments.forEach((measurement) => {
            measurement.destroy();
        });
        if (this.valves) {
            this.valves.destroy()
        }

    },*/
    regions: {
        tabpanel: '.panel-container'
    },
    onRender: function() {
        let customPanel = new CustomPanel({ collection: this.viewGroups, view: Measurments, viewKey: 'faces' });
        this.showChildView('tabpanel', customPanel);
        this.$('.panel-container').append(`<button class="btn btn-start btn-charts">${app.language[button_charts] || button_charts}</button>`);
        this.$('.btn-charts').on('click', this.showChartModal.bind(this));
       /* this.measurments = [];
        this.showChildView('tabpanel', this.tabPanel);

        let tabs = this.tabPanel.getChildView('tabs');
        let tabsContent = this.tabPanel.getChildView('tabsContent');

        this.viewGroups.once('sync', () => {
            app.devices.each((device, i) => {
                let faces = device.get('faces');
                if (faces.length > 0) {
                    faces.each((face, index) => {
                        let viewgrp = this.viewGroups.findWhere({ id: face.get('viewgrp') });
                        if (viewgrp !== undefined) {
                            viewgrp.get('faces').add(face);
                        }

                    });
                }
            });

            this.viewGroups.each((group, index) => {
                this.measurments[index] = new Measurments({ collection: group.get('faces') });
                tabsContent.$('.tab-pane#' + group.get('id') + ' .row').append(this.measurments[index].render().el);
                if (group.get('faces').length === 0) {
                    tabsContent.$('.tab-pane#' + group.get('id')).remove();
                    this.$("a[href='#" + group.get('id') + "']").parent().remove()
                }
            });
            $(tabs.$el.children()[0]).addClass('active')
            $(tabsContent.$el.children()[0]).addClass('active')

            if (app.devices.models[0].get('ctrl') === 2) {
                let valves = app.devices.where({ typ: 10 });
                this.valves = new ValvesView({ collection: new Backbone.Collection(valves) });
                let air = this.viewGroups.findWhere({ name: 'tit_air' });

                tabsContent.$('.tab-pane#' + air.get('id') + ' .gruppa').append(this.valves.render().el);
                //this.$('#' + this.viewGroupCollection.models[0].get('id')).append(shit)
            }

        });*/
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        //this.$el.fadeIn();

        this.$el.fadeIn('slow');

    },
    initialize: function() {
        this.model = new Backbone.Model({
            title: app.language[menu_current_values] || menu_current_values
        });

        this.viewGroups = app.viewgrps;
    }

});