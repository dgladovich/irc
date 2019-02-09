import template from '../general/templates/page.jst';
import { View, Model } from 'backbone.marionette';
//import EquipItem from './EquipItem';
import EquipList from './EquipList';
import {setWrapHeight} from '../../Utils';
const menu_select_device = 'menu_select_device';

export default View.extend({
    template: template,
    events: {
        'click #close-page': 'hidePage'
    },
    regions: {
    	'content': '.panel-container'
    },
    hidePage: function() {
        this.$el.fadeOut(500, ()=>{
            document.location.href = '#';
        });
    },
    onRender: function(){

        this.showChildView('content', new EquipList({collection: app.controllers}));

    },
    initialize: function () {
        this.model = new Backbone.Model({
            title: app.language[menu_select_device] || menu_select_device
        });
    }
});