import { View, Model, CollectionView } from 'backbone.marionette';
import template from './templates/godmodal.jst';
import table_template from './templates/freak_table.jst';
import body_row from './templates/freak_row.jst';

const BodyRow = View.extend({
  template: body_row,
  className: 'custom-table-row',
});

const BodyRows = CollectionView.extend({
  childView: BodyRow,
});

const FreakTable = View.extend({
  template: table_template,
  regions: {
    body: '#rows',
  },
  onRender() {
    this.showChildView('body', new BodyRows({ collection: this.collection }));
  },
});

export default View.extend({
  template,

  onRender() {
    this.$('#status-uzel1').on('hidden.bs.modal', this.destroy.bind(this));
    this.table = new FreakTable({ collection: this.collection });
    this.$('.modal-body').html(this.table.render().el);
  },
  initialize() {
    this.model = new Backbone.Model({
      name: 'Режим бога',
    });
    this.collection = app.freak;
  },
});
