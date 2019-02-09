import { View, Model, CollectionView } from 'backbone.marionette';
import table_head from './templates/device/table_head.jst';
import body_row from './templates/device/body_row.jst';
import body_row_status from './templates/device/body_row_status.jst';
import body_row_value from './templates/device/body_row_value.jst';
import table_template from './templates/device/table_template.jst';


const BodyRowViewValue = View.extend({
    tagName: 'tr',
    template: body_row_value,

    initialize: function() {
        if (!this.model.get('show_scat')) {
            this.destroy();
        } else {
            this.listenTo(this.model, 'change:def', () => {
                this.render.call(this)
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
        let status = app.statuses.findWhere({
            grp: this.model.get('stat_grp'),
            num: this.model.get('def'),
        });
        this.$('.top-margined.statused').html(status.get('trans'));
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
        if(item.get('measure')){
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
        this.showChildView('head', new TableHead());
        this.showChildView('body', new TableBody({
            collection: this.collection
        }));
    }
});