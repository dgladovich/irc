import Backbone from 'backbone';
import _ from 'underscore';
import store from 'store';

export default Backbone.Collection.extend({
  url: 'analitics',
  sync() {
    const dfd = $.Deferred();
    if (store.get('analitics')) {
      console.log('analitics found');
      this.set(store.get('analitics'));
      dfd.resolve();
    } else {
      $.get('/analitics').then((data) => {
        store.set('analitics', data);
        this.set(data);
        dfd.resolve();
      });
    }

    return dfd.promise();
  },
});
