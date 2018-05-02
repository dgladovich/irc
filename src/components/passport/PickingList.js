import template from './templates/picking.jst';
import { View, Model } from 'backbone.marionette';
import PickingListTable from './PickingListTable'


export default View.extend({
    template: template,
    regions: {
    	content: {
    		el: '.passport-scroller'
    	}
    },
    onRender: function(){
            //this.showChildView('content', new PickingListTable({ collection: new Backbone.Collection(this.model.get('pickinglist').opts) }))
    }
});