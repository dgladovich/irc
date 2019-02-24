import { View, Model, CollectionView } from 'backbone.marionette';
import moment from 'moment';
import table_head from './templates/journal/table_head.jst';
import body_row from './templates/journal/body_row.jst';
import empty_journal from './templates/journal/empty_journal.jst';
import table_template from '../general/templates/table_template.jst';


const EmptyJournal = View.extend({
  template: empty_journal,
  tagName: 'tr',
});
const BodyRowView = View.extend({
  tagName: 'tr',
  template: body_row,
});

const TableHead = View.extend({
  tagName: 'thead',
  template: table_head,
  ui: {
    // orderByNumber: '.order-by-list_index',
    orderByName: '.order-by-name',
    orderByDate: '.order-by-idle_date',
    orderByTime: '.order-by-idle_time',
    orderByType: '.order-by-typ',
    orderByCode: '.order-by-code',
    orderByDesc: '.order-by-description',
  },
  events: {
    'click @ui.orderByNumber': 'sort',
    'click @ui.orderByName': 'sort',
    'click @ui.orderByDate': 'sort',
    'click @ui.orderByType': 'sort',
    'click @ui.orderByTime': 'sort',
    'click @ui.orderByCode': 'sort',
    'click @ui.orderByDesc': 'sort',
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
    this.orderTag = 'list_index';
    this.previousTag = 'order-by-list_index';
  },


});

const TableBody = CollectionView.extend({
  tagName: 'tbody',
  childView: BodyRowView,
  emptyView: EmptyJournal,
  childViewOptions(model, index) {
    let message = 'Во время работы устройства возникла ошибка';
    let typeClass = '';
    const error = app.errors.findWhere({
      id: model.get('code'),
    });
    const device = app.devices.findWhere({
      id: model.get('dev'),
    });
    if (error) {
      message = error.get('msg');
      switch (error.get('typ')) {
      case 0:
        typeClass = 'active';
        break;
      case 1:

        typeClass = 'att';
        break;

      case 2:

        typeClass = 'danger';
        break;
      }
    }
    model.set({
      list_index: index + 1,
      description: message,
      typeClass,
      device,
      idle_day: moment(model.get('idle_date')).format('DD-MM-YYYY'),
      idle_time: moment(model.get('idle_date')).format('HH:mm:ss'),
    });
    return {
      childIndex: index,
    };
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
  childViewEvents: {
    changeOrderColumn: 'changeOrder',
  },
  onRender() {
    this.showChildView('head', new TableHead({
      model: this.model,
      collection: this.collection,
    }));
    this.showChildView('body', new TableBody({
      collection: this.collection,
    }));
  },
});
