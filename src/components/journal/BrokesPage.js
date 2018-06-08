import {View, Model, CollectionView} from 'backbone.marionette';
import moment from 'moment';
import 'moment/locale/pt-br';
import BrokesCollection from '../../collections/BrokesCollection';
import table_head from './templates/brokes/table_head.jst';
import broke_tab from './templates/brokes/broke_tab.jst';
import body_row from './templates/brokes/body_row.jst';
import table_template from '../general/templates/table_template.jst';
import empty_brokes from './templates/brokes/empty_brokes.jst';


const EmptyBrokes = View.extend({
    template: empty_brokes,
    tagName: 'tr'
});

const BodyRowView = View.extend({
    tagName: 'tr',
    template: body_row,
    updateStatus: function(){
       // console.log('I am updating status');
       // console.log(this.model.toJSON())
    },
    onRender: function(){
        this.updateStatus.call(this);
    },
    initialize: function () {
        this.listenTo(this.model, 'destroy', this.destroy.bind(this));
        this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this))
    }
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
        'click @ui.orderByCode': 'sort'
    },
    sort: function (e) {
        let className = e.currentTarget.className;
        let orderTag = className.split('-')[2];

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
                    .addClass('glyphicon-triangle-bottom')

            } else {
                $(e.currentTarget)
                    .find('.glyphicon')
                    .removeClass('glyphicon-triangle-bottom')
                    .addClass('glyphicon-triangle-top')
            }
        } else {

            $(this.previousTag)
                .find('.glyphicon')
                .removeClass('glyphicon-triangle-bottom glyphicon-triangle-top')
                .addClass('icon-sort')
            $(e.currentTarget)
                .find('.glyphicon')
                .removeClass('glyphicon')
                .removeClass('icon-sort')
                .addClass('glyphicon glyphicon-triangle-bottom')
        }
        this.previousTag = e.currentTarget;

        this.collection.comparator = (item, index) => {
            let comparitor = item.get(this.orderTag);

            if (typeof comparitor === 'string') {
                comparitor = comparitor.localeCompare(index.get(orderTag));
            } else {
                comparitor = item.get(this.orderTag) - index.get(this.orderTag)
            }
            return this.comparatorSign * comparitor;

        }
        this.collection.sort();
    },

    initialize: function () {
        this.comparatorSign = 1;
        this.orderTag = 'id';
        this.previousTag = 'order-by-id';
    }
});

const TableBody = CollectionView.extend({
    tagName: 'tbody',
    emptyView: EmptyBrokes,
    childView: BodyRowView,
    initialize: function () {
        this.listenTo(this.collection, 'sort', this.render.bind(this));
    }
});

const BrokesTable = View.extend({
    tagName: 'table',
    className: 'table',
    template: table_template,
    regions: {
        head: {
            el: 'thead',
            replaceElement: true
        },
        body: {
            el: 'tbody',
            replaceElement: true
        }

    },
    onRender: function () {
        this.showChildView('head', new TableHead({
            collection: this.collection
        }));
        this.showChildView('body', new TableBody({
            collection: this.collection
        }));
    }
});

export default View.extend({
    template: broke_tab,
    regions: {
        table: '#brokes-table'
    },
    updateAlarms: function () {
        if(this.collection.length > 0){
            this.$('#brokes-table').empty();
            this.showChildView('table', new BrokesTable({collection: this.collection}));
        } else {
            this.$('#brokes-table').html('<div style="text-align: center; margin: 150px;"><h3>Неисправностей нет</h3></div>');
        }

    },
    onRender: function () {
        this.updateAlarms();
    },
    initialize: function () {
        this.collection = new BrokesCollection();
        this.listenTo(this.collection, 'update', this.updateAlarms.bind(this));
    }
});