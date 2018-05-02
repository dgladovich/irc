import template from '../general/templates/page.jst';
import { View, Model } from 'backbone.marionette';
//import EquipItem from './EquipItem';
import EquipList from './EquipList';
import {setWrapHeight} from '../../Utils';


const model = new Backbone.Model({
    title: 'Выбор оборудования'
});


export default View.extend({
    template: template,
    model: model,
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
/*        setInterval(()=>{

        },400)*/

    }
});