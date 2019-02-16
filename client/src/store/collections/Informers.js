import Backbone from 'backbone';
import store from 'store';

export default Backbone.Collection.extend({
  url: 'analitics',
  /*    sync: function () {
        console.log(store.get('analitics'))
        let dfd = $.Deferred();
        if (store.get('analitics')) {
            console.log('analitics found');
            this.set(store.get('analitics'));
            dfd.resolve();

        } else {
            console.log('analitics not found')
            $.get('/analitics').then((data) => {
                store.set('analitics', data);
                this.set(data);
                dfd.resolve();
            });
        }

        return dfd.promise();
    } */

});
