import { CollectionView } from 'backbone.marionette';
import TabContent from './TabContent';

export default CollectionView.extend({
    childView: TabContent,
    className: 'tab-content device-meas-list',
    buildChildView: function(child, ChildViewClass, childViewOptions){
        let options = {model: new Backbone.Model({id: child.get('id')}), view: child.get('view')};
        const view = new ChildViewClass(options);
        return view;
    },
});