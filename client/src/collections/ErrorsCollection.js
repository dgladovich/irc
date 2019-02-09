import Backbone from 'backbone';
import _ from 'lodash';
import store from 'store';

export default Backbone.Collection.extend({
  url: 'errors',
  sync() {
    const dfd = $.Deferred();
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
  },
});
