import { View, Model, CollectionView } from 'backbone.marionette';
import table_head from '../../templates/modal/controller/table_head.jst';
import body_row from '../../templates/modal/controller/body_row.jst';
import table_template from '../../templates/modal/controller/table_template.jst';
import emptyMessages from '../../templates/navbar/empty_messages.jst';


const EmptyView = View.extend({
    tagName: 'tr',
    template: emptyMessages
});


const BodyRowView = View.extend({
    tagName: 'tr',
    template: body_row,
    onRender: function() {}
});

const TableHead = View.extend({
    tagName: 'thead',
    template: table_head
});

const TableBody = CollectionView.extend({
    tagName: 'tbody',
    childView: BodyRowView,
    emptyView: EmptyView
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