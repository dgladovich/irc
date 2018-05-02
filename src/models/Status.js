import Backbone from 'backbone';
import StatusesStructuresCollection from '../collections/StatusesStructuresCollection';

export default Backbone.RelationalModel.extend({
    relations: [
        {
            type: Backbone.HasMany,
            key: 'sgrps_opts',
            collectionType: StatusesStructuresCollection,
            reverseRelation: {
                type: Backbone.One,
                key: 'statusGroup'
            }
        }
    ],
    initialize: function () {}

});