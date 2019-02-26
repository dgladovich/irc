import { View, Model, CollectionView } from 'backbone.marionette';
import table_head from './templates/picking_list/table_head.jst';
import body_row from './templates/picking_list/body_row.jst';
import table_template from '../general/templates/table_template.jst';


const BodyRowView = View.extend({
  tagName: 'tr',
  template: body_row,
});

const TableHead = View.extend({
  tagName: 'thead',
  template: table_head,
});

const TableBody = CollectionView.extend({
  tagName: 'tbody',
  childView: BodyRowView,
  initialize() {
    this.collection.each((row, index) => {
      row.set({
        list_index: index + 1,
      });
    });
  },
});

export default View.extend({
  tagName: 'table',
  className: 'table',
  template: table_template,

  regions: {
    head: {
      el: 'thead',
      replaceElement: true,
    },
    body: {
      el: 'tbody',
      replaceElement: true,
    },

  },

  onRender() {
    this.showChildView('head', new TableHead());
    this.showChildView('body', new TableBody({
      collection: this.collection,
    }));
  },
});
