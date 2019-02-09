import aja from 'aja';
import Radio from 'backbone.radio';
import { View, Model, CollectionView } from 'backbone.marionette';
import JournalTable from './JournalTable';
import template from '../general/templates/journal-tab.jst';
import not_found from './templates/journal/not_found.jst';
import JournalFilterModel from '../../models/JournalFilterModel';
import JournalCollection from '../../collections/JournalCollection';

const alarm = Radio.channel('confirm');
const error_code = 'tit_code';

const NotFoundQuery = View.extend({
  template: not_found,
});

const ErrorCode = View.extend({
  template: _.noop,
  tagName: 'option',
  onRender() {
    this
      .$el
      .attr('value', this.model.get('id'))
      .html(this.model.get('id'));
  },
});
const ErrorCodes = CollectionView.extend({
  childView: ErrorCode,
  tagName: 'select',
  className: 'form-control',
  attributes: {
    id: 'code',
  },
  onRender() {
    const text = `<option value='all'>- ${app.language[error_code] || error_code} -</option>`;
    this.$el.prepend(text).val('all');
  },
});
export default View.extend({
  template,
  regions: {
    filter: '.form-inline',
    table: '.table-wrapper',
    code: {
      el: '#code',
      replaceElement: true,
    },
  },
  ui: {
    dateFrom: 'input#dateFrom',
    dateTo: 'input#dateTo',
    type: 'select#type',
    code: 'select#code',

  },
  events: {
    'change #dateFrom': 'handleSave',
    'change #dateTo': 'handleSave',
    'change #type': 'handleSave',
    'change #code': 'handleSave',
  },
  handleSave(e) {
    const attribute = $(e.currentTarget)[0].id;


    let value = $(e.currentTarget).val();
    if (attribute === 'type' || attribute === 'code') {
      if (value !== 'all') {
        value *= 1;
      }
    }

    return this.journalFilterModel.set({
      [attribute]: value,
      page: 1,
    });
  },
  onScroll(e) {
    const a = e.target;
    const offset = a.scrollTop + a.offsetHeight;
    if (a.scrollHeight < a.scrollTop + a.offsetHeight + 100) {
      this.$('.table-wrapper').off('scroll');
      this.trigger('scroll:down');
    }
  },
  onChangeFilter() {
    aja()
      .url('/journal')
      .on('success', (data) => {
        this.collection.reset(data);
      })
      .on('error', (e) => {
        console.log(e, 'something go wrong');
      })
      .data(this.journalFilterModel.toJSON())
      .go();
  },
  onChangePage() {
    this.$('.table-wrapper').off('scroll');
    this.journalFilterModel.set('page', this.journalFilterModel.get('page') + 1);
    aja()
      .url('/journal')
      .on('success', (data) => {
        this.collection.add(data);
        this.$('.table-wrapper').scroll(this.onScroll.bind(this));
      })
      .on('error', (e) => {
      })
      .data(this.journalFilterModel.toJSON())
      .go();
  },
  updateJournal() {
    if (this.collection.length > 0) {
      this.showChildView('table', new JournalTable({ model: this.model, collection: this.collection }));
    } else {
      this.showChildView('table', new NotFoundQuery());
    }
  },
  fetchInit() {
    aja()
      .url('/journal')
      .on('success', (data) => {
        this.collection.add(data);
        this.$('.table-wrapper').scroll(this.onScroll.bind(this));
      })
      .on('error', (e) => {
      })
      .data(this.journalFilterModel.toJSON())
      .go();
  },
  onRender() {
    this.$('#dateFrom').val(this.journalFilterModel.get('dateFrom'));
    this.$('#dateTo').val(this.journalFilterModel.get('dateTo'));
    this.$('#type').val(this.journalFilterModel.get('type'));
    this.$('#code').val(this.journalFilterModel.get('code'));
    this.showChildView('code', new ErrorCodes({ collection: app.errors }));
    this.updateJournal();
    this.$('.table-wrapper').scroll(this.onScroll.bind(this));
  },
  initialize() {
    this.collection = new JournalCollection();
    this.journalFilterModel = new JournalFilterModel({
      page: 2,
    });
    this.fetchInit.call(this);
    this.listenTo(this.collection, 'update', this.updateJournal.bind(this));
    this.listenTo(this.collection, 'reset', this.updateJournal.bind(this));
    this.journalFilterModel.on({
      'change:dateFrom': this.onChangeFilter.bind(this),
      'change:dateTo': this.onChangeFilter.bind(this),
      'change:type': this.onChangeFilter.bind(this),
      'change:code': this.onChangeFilter.bind(this),
    });
    /*        this.listenTo(alarm, 'alarm:update', () => {
            this.journalFilterModel.clear().set(this.journalFilterModel.defaults)
        }); */
    this.on('scroll:down', this.onChangePage.bind(this));
  },
});
