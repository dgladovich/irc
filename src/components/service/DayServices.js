import template from './templates/day_services.jst';
import day_temp from './templates/day_ser.jst';
import empty_day_temp from './templates/empty_day_temp.jst';
import {CollectionView, View, Model} from 'backbone.marionette';

const DaySerEmpty = View.extend({
    template: empty_day_temp
});

const DaySer = View.extend({
    template: day_temp,
});

const DayServices = CollectionView.extend({
    childView: DaySer,
    emptyView: DaySerEmpty
});


export default View.extend({
    template: template,
    regions: {
        services: {
            el: '#services',
            replaceElement: true,
        }
    },
    onRender: function () {

        this.showChildView('services', new DayServices({
            collection: this.collection
        }));
    },
});
