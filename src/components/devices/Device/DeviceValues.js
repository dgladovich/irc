import { View, Model, CollectionView } from 'backbone.marionette';
import table_head from './templates/table_head.jst';
import body_row from './templates/body_row.jst';
import body_row_status from './templates/body_row_status.jst';
import body_row_value from './templates/body_row_value.jst';
import table_template from './templates/table_template.jst';


const BodyRowViewValue = View.extend({
    tagName: 'tr',
    template: body_row_value,
    updateValue: function(){
        let value = this.model.get('def'),
            valueSelector = '.controller-modal-value';
        console.log(`Value of ${this.model.get('name')} is: ${this.model.get('def')}`)
        this.$(valueSelector).html(value);
    },
    onRender: function(){
        this.updateValue.call(this);
    },

    initialize: function() {
        if (!this.model.get('show_scat')) {
            this.destroy();
        } else {
            this.listenTo(this.model, 'change:def', () => {
                this.updateValue.call(this)
            });
        }
    }
});
const BodyRowViewStatus = View.extend({
    tagName: 'tr',
    template: body_row_status,
    onRender: function(){
        this.updateStatus();
    },
    updateStatus: function(){
        let deviceStatus = app.statuses.findWhere({ id: this.model.get('stat_grp')}).get('sgrps_opts').findWhere({num: this.model.get('def')}),
            statusSelector = '.controller-modal-status';

        if (deviceStatus !== undefined) {
            let statusTranslate = app.language[deviceStatus.get('name')]
            this.$(statusSelector).html(statusTranslate);
        } else {
            this.previousClass = 'off';
            console.log('Get wrong status; Device' + this.model.get('id') + '; Status:' + this.model.get('stat') + '; Group:' + this.model.get('sgrp'))
        }
        return this;
    },
    initialize: function() {
        if (!this.model.get('show_scat')) {
            this.destroy();
        } else {
            this.listenTo(this.model, 'change:def', this.updateStatus.bind(this));
        }
    }
});

const TableHead = View.extend({
    tagName: 'thead',
    template: table_head
});

const TableBody = CollectionView.extend({
    tagName: 'tbody',
    childView: function(item){
        if(item.get('stat_grp') === 0 ){
            return BodyRowViewValue;
        } else {
            return BodyRowViewStatus;
        }
    }
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

    onRender: function() {
        //this.showChildView('head', new TableHead());
        this.showChildView('body', new TableBody({
            collection: this.collection
        }));
    }
});