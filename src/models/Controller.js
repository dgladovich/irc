import DevicesCollection from '../collections/DevicesCollection';
import DeviceGroupsCollection from '../collections/DeviceGroupCollection';
import CamerasCollection from '../collections/CamerasCollection';
import ControllerPassport from '../models/ControllerPassport';

export default Backbone.RelationalModel.extend({
    relations: [
        {
            type: Backbone.HasMany,
            key: 'devs',
            collectionType: DevicesCollection,
        },
        {
            type: Backbone.HasMany,
            key: 'cameras',
            collectionType: CamerasCollection,
        },
        {
            type: Backbone.HasOne,
            key: 'pass',
            relatedModel: ControllerPassport
        }

    ]
});