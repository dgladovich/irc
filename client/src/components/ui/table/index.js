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
    const headCollection = this.model.get('head');
    const bodyCollection = this.model.get('body');
    this.showChildView('head', new Head({ collection: headCollection }));
    //this.showChildView('body', new Body(bodyCollection));
  },
  initialize(opt) {
    this.model = new TableModel(opt);
  },
});
