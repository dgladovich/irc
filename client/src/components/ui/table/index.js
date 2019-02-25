import { View } from 'backbone.marionette';
import template from './table.jst';
import TableModel from './model';
import Head from './head';
import Body from './body';

export default View.extend({
  template,
  regions: {
    head: '.table-head',
    body: '.table-body',
  },
  onRender() {
    this.showChildView('head', new Head({ model: this.model }));
    this.showChildView('body', new Body({
      collection: this.model.get('data'),
      columns: this.model.get('columns'),
    }));
  },
  initialize(opt) {
    this.model = new TableModel(opt);
  },
});
