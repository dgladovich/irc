import {View, Model, CollectionView} from 'backbone.marionette';
import table_head from './templates/table_head.jst';
import body_row from './templates/body_row.jst';
import table_template from './templates/table_template.jst';


const BodyRowView = View.extend({
    tagName: 'tr',
    template: body_row,
    onRender: function () {
        this.updateStatus.call(this);
    },
    updateStatus: function () {
        let title = this.$('.panel-title');
        title.removeClass(this.previousClass);
        let deviceStatus = app
            .statuses
            .findWhere({ id: this.model.get('sgrp')})
            .get('sgrps_opts')
            .findWhere({num: this.model.get('stat')});

        if (deviceStatus !== undefined) {
            this.previousClass = deviceStatus.get('dclass');
        } else {
            this.previousClass = 'off';
            console.log('Get wrong status; Device' + this.model.get('id') + '; Status:' + this.model.get('stat') + '; Group:' + this.model.get('sgrp'))
        }
        let langKey = deviceStatus.get('name')
        let statusTranslate = app.language[langKey];
        this.$('.text-center').html(statusTranslate);
        title.addClass(this.previousClass);
    },
    onDestroy: function () {
        this.stopListening();
    },
    initialize: function () {
        this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this));
    }
});

const TableHead = View.extend({
    tagName: 'thead',
    template: table_head
});

const TableBody = CollectionView.extend({
    tagName: 'tbody',
    childView: BodyRowView
});

export default View.extend({
    tagName: 'table',
    className: 'table dark-table',
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
        this.showChildView('head', new TableHead());
        this.showChildView('body', new TableBody({collection: this.collection}));
    }
});