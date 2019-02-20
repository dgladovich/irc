import { View, Model, CollectionView } from 'backbone.marionette';
import { t } from 'i18next';
import moment from 'moment';
import 'moment/locale/pt-br';
import table_head from './templates/brokes/table_head.jst';
import broke_tab from './templates/brokes/broke_tab.jst';
import body_row from './templates/brokes/body_row.jst';
import table_template from '../general/templates/table_template.jst';
import empty_brokes from './templates/brokes/empty_brokes.jst';

const empty_brokes_mess = 'empty_brokes_mess';

const EmptyBrokes = View.extend({
  template: empty_brokes,
  tagName: 'tr',
});

const BodyRowView = View.extend({
  tagName: 'tr',
  template: body_row,
  updateStatus() {
    const dclass = this.model.get('status').get('dclass');
    this.$('.indicator').removeClass(this.previousClass).addClass(dclass);
    this.previousClass = dclass;
  },
  onRender() {
    this.updateStatus.call(this);
  },
  initialize() {
    this.previousClass = '';
    this.listenTo(this.model, 'destroy', this.destroy.bind(this));
    this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this));
  },
});

const TableHead = View.extend({
  tagName: 'thead',
  template: table_head,
  ui: {
    orderById: '.order-by-id',
    orderByName: '.order-by-name',
    orderByDate: '.order-by-date',
    orderByTime: '.order-by-time',
    orderByStatus: '.order-by-status',
    orderByCode: '.order-by-code',
    orderByMsg: '.order-by-msg',
  },
  events: {
    'click @ui.orderById': 'sort',
    'click @ui.orderByName': 'sort',
    'click @ui.orderByDate': 'sort',
    'click @ui.orderByTime': 'sort',
    'click @ui.orderByStatus': 'sort',
    'click @ui.orderByCode': 'sort',
  },
  sort(e) {
    const className = e.currentTarget.className;
    const orderTag = className.split('-')[2];

    if (this.orderTag === orderTag) {
      this.comparatorSign *= -1;
    } else {
      this.comparatorSign = 1;
      this.orderTag = orderTag;
    }

    if (className === this.previousTag.className) {
      if (this.comparatorSign === 1) {
        $(e.currentTarget)
          .find('.glyphicon')
          .removeClass('icon-sort')
          .removeClass('glyphicon-triangle-top')
          .addClass('glyphicon-triangle-bottom');
      } else {
        $(e.currentTarget)
          .find('.glyphicon')
          .removeClass('glyphicon-triangle-bottom')
          .addClass('glyphicon-triangle-top');
      }
    } else {
      $(this.previousTag)
        .find('.glyphicon')
        .removeClass('glyphicon-triangle-bottom glyphicon-triangle-top')
        .addClass('icon-sort');
      $(e.currentTarget)
        .find('.glyphicon')
        .removeClass('glyphicon')
        .removeClass('icon-sort')
        .addClass('glyphicon glyphicon-triangle-bottom');
    }
    this.previousTag = e.currentTarget;

    this.collection.comparator = (item, index) => {
      let comparitor = item.get(this.orderTag);

      if (typeof comparitor === 'string') {
        comparitor = comparitor.localeCompare(index.get(orderTag));
      } else {
        comparitor = item.get(this.orderTag) - index.get(this.orderTag);
      }
      return this.comparatorSign * comparitor;
    };
    this.collection.sort();
  },

  initialize() {
    this.comparatorSign = 1;
    this.orderTag = 'id';
    this.previousTag = 'order-by-id';
  },
});

const TableBody = CollectionView.extend({
  tagName: 'tbody',
  emptyView: EmptyBrokes,
  childView: BodyRowView,
  initialize() {
    this.listenTo(this.collection, 'sort', this.render.bind(this));
  },
});

const BrokesTable = View.extend({
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
    this.showChildView('head', new TableHead({
      collection: this.collection,
    }));
    this.showChildView('body', new TableBody({
      collection: this.collection,
    }));
  },
});

export default View.extend({
  template: broke_tab,
  regions: {
    table: '#brokes-table',
  },
  updateAlarms() {
    if (this.collection.length > 0) {
      this.$('#brokes-table').empty();
      this.showChildView('table', new BrokesTable({ collection: this.collection }));
    } else {
      this.$('#brokes-table').html(`<div style="text-align: center; margin: 150px;"><h3>${t('empty_brokes_mess')}</h3></div>`);
    }
  },
  onRender() {
    this.updateAlarms();
  },
  initialize() {
    this.collection = app.brokes;
    this.listenTo(this.collection, 'update', this.updateAlarms.bind(this));
  },
});
