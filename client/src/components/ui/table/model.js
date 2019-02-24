import { Model, Collection } from 'backbone';

export default Model.extend({
  initialize(opts) {
    const { columns, data } = opts;
    const head = columns.map(col => ({
      text: col.title,
    }));
    const body = data.map(item => columns.map(col => ({
      text: item[col.datapath],
    })));
    const headCollection = new Collection(head);
    const bodyCollection = new Collection(body);
    this.set('head', headCollection);
    this.set('body', bodyCollection);

  },
});
