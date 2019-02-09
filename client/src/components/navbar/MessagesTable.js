import {View, Model, CollectionView} from 'backbone.marionette';
import moment from 'moment';
import Radio from 'backbone.radio';
import 'moment/locale/pt-br';
import table_head from './templates/table_head.jst';
import body_row from './templates/body_row.jst';
import table_template from '../general/templates/table_template.jst';

const alarmConfirm = Radio.channel('confirm');
const ch = Radio.channel('controller');

const BodyRowView = View.extend({
    tagName: 'tr',
    template: body_row,
    ui: {
        submit: '.btn-default'
    },
    events: {
        'click @ui.submit': 'confirmAlarm',
    },
    onBeforeDestroy: function () {
        clearTimeout(this.backToLife);
    },
    confirmAlarm: function () {
        /*        alarmConfirm.trigger('alarm:confirm', {
                    dev: this.model.get('controller').get('lid'),
                    ctrl: this.model.get('ctrl'),
                    alr: this.model.get('id'),
                    date: moment().format('YYYY-MM-DD HH:mm:ss'),
                    user: 1
                });*/
        let confirmArguments = {
          ivan_id: this.model.get('ivan_id')
        };
        let alarmToConfirm = {
            action: 'confirm',
            arguments: confirmArguments
        };
        ch.trigger('controller', alarmToConfirm);
        this.getUI('submit').prop('disabled', true);

        this.backToLife = setTimeout(() => {
            this.getUI('submit').prop('disabled', false);
        }, 10000)
    },
    initialize: function () {
        this.listenTo(this.model, 'destroy', this.destroy.bind(this))
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

        };
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
    childView: BodyRowView,
    childViewOptions: function (model, index) {
        let message = 'Во время работы устройства возникла ошибка';
        let typeClass = '';
        let error = app.errors.findWhere({
            id: model.get('code')
        });
        let device = app.devices.findWhere({
            id: model.get('dev')
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
            typeClass: typeClass,
            device: device,
            idle_day: moment(model.get('idle_date')).format("DD-MM-YYYY"),
            idle_time: moment(model.get('idle_date')).format("HH:mm:ss"),
            error: error
        });
        return {
            childIndex: index,
        }
    },
    initialize: function () {
        alarmConfirm.on('alarm:request', (request) => {
            let alr = this.collection.findWhere({
                id: request.alr,
            });
            this.collection.remove(alr);
        });
        this.listenTo(this.collection, 'sort', this.render.bind(this));
    }
});

export default View.extend({
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
    },
    initialize: function () {
        this.Brokes = new TableBody({collection: this.collection});
        this.listenTo(this.collection, 'reset', this.Brokes.render.bind(this.Brokes))
    }
});