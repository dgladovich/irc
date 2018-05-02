import { CollectionView } from 'backbone.marionette';
import Group from './Group';

export default CollectionView.extend({
    childView: Group,
    onBeforeRender: function(){}
});