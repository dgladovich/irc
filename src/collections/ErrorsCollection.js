import Backbone from 'backbone';
import _ from 'underscore';
import BackboneRelational from 'backbone-relational';
import store from 'store';

export default Backbone.Collection.extend({
    url: 'errors',
    sync: function(){
        let dfd = $.Deferred();
        if (store.get('errors')) {
            this.set(store.get('errors'));
            dfd.resolve();

        } else {
            $.get('errors').then((data) => {
                store.set('errors', data);
                this.set(data);
                dfd.resolve();
            });
        }
        return dfd.promise();
    }
})
