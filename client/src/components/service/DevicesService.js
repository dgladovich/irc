import { View, CollectionView, Model } from 'backbone.marionette';
import DeviceService from './DeviceService';


export default CollectionView.extend({
    childView: DeviceService,

});