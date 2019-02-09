import { View, CollectionView } from 'backbone.marionette';
import valves from './templates/valves_template.jst';
import valve from './templates/valve_template.jst';

const Valve = View.extend({
    template: valve,
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
    },
    showStatus: function() {
        let device = this.$('.klap');
        device.removeClass(this.previousClass);
        let deviceStatus = app.statuses.findWhere({
            grp: this.model.get('sgrp'),
            num: this.model.get('stat')
        });
        if (deviceStatus !== undefined) {
            switch (deviceStatus.get('clr')) {
                case "#c7c7c9":
                    {
                        this.previousClass = '';
                        break;
                    }
                case "#e12c0d":
                    {

                        this.previousClass = 'danger';

                        break;
                    }
                case "#FFEB3B":
                    {

                        this.previousClass = 'service';

                        break;
                    }
                case "lime":
                case "#0db800":
                    {
                        this.previousClass = 'active';
                        break;
                    }
                default:
                    {
                        this.previousClass = 'off';
                        break;
                    }
            }
        } else {
            console.log('Get wrong status; Device' + this.model.get('id') + '; Status:' + this.model.get('stat') + '; Group:' + this.model.get('sgrp'))
        }


        device.addClass(this.previousClass);
    },
    onDestroy: function(){
        this.stopListening();
    },
    initialize: function() {
        this.previousClass = '';
        this.listenTo(this.model, 'change', this.showStatus.bind(this))
    }
})

const Valves = CollectionView.extend({
    childView: Valve,
    filter: function(child){
        return !!child.get('active');
    },
    childViewOptions: function(model, index) {

        return model.set({
            list_index: index + 1,
            valveStatus: ''
        })
    },
    onBeforeRender: function() {
/*        this.collection.each((valve, index) => {
            valve.set({
                list_index: index + 1,
                valveStatus: ''
            })
        });*/
/*        for (let i = 0; i < 14; i++) {
            this.collection.add({
                list_index: i + 5,
                valveStatus: 'off'
            })
        }*/
    },
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
    }
})


export default View.extend({
    template: valves,

    regions: {
        valves: {
            el: '.row'
        }
    },
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        this.showChildView('valves', new Valves({ collection: this.collection }))

    },
    initialize: function() {}

});