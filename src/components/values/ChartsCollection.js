import { CollectionView, View } from 'backbone.marionette';
import Chart from './Chart';
import template from './templates/chartlist.jst'

const Charts = CollectionView.extend({
    childView: Chart
});
export default View.extend({
    template: template,
    regions: {
        content: '.chartlist'
    },
    onRender: function(){
        let collection = this.collection.filter((face)=>{ return face.get('viewtype') !==  0});
        this.showChildView('content', new Charts({collection: new Backbone.Collection(collection)}));
    }
});

