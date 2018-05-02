import { CollectionView } from 'backbone.marionette';
import TabContent from './TabContent';

export default CollectionView.extend({
    childView: TabContent,
    className: 'tab-content device-meas-list',
    buildChildView: function(child, ChildViewClass, childViewOptions){
        let options = _.extend({model: child}, {view: this.passView, viewKey: this.viewKey});
        const view = new ChildViewClass(options);
        return view;
    },
    initialize: function(opt){
        this.passView = opt.view;
        this.viewKey = opt.viewKey;
    }
});