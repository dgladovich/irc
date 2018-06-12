import Backbone from 'backbone';
import StatusesStructuresCollection from '../collections/StatusesStructuresCollection';

export default Backbone.Model.extend({
    initialize: function (){
        this.set({
            sgrps_opts: new Backbone.Collection(this.get('sgrps_opts'))
        })
    }
});