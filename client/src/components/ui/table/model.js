import { Model, Collection } from 'backbone';

export default Model.extend({
  defaults: {
    columns: [],
    data: new Collection(),
    options: new Model(),
  },
  initialize(opts) {
    const { data } = opts;
    this.set('data', new Collection(data));
  },
});
