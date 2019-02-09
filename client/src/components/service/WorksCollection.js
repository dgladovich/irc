import template from './templates/workspanel.jst';
import { View, CollectionView, Model } from 'backbone.marionette';
import Radio from 'backbone.radio';
import moment from 'moment';
import aja from 'aja';
import Work from './Work';

const serviceChannel = Radio.channel('servicechannel');

const WorksTable = CollectionView.extend({
    childView: Work
});

export default View.extend({
    template: template,
    regions: {
        works: '.works-list'
    },
    ui: {
        makeWorks: '.make-works'
    },
    events: {
        'click @ui.makeWorks': 'performWorks'
    },
    performWorks: function(){
        let selectedWorks = this.collection.where({selected: true});
        let selected = [];
        selectedWorks.map((work)=>{
            selected.push({
                id: work.get('id'),
                datetime: moment()
            })
        });
        aja()
            .method('put')
            .url('/to/performworks')
            .body(selected)
            .on('200', (response)=>{
                response.forEach((work)=>{
                    serviceChannel.trigger(`work:perform:${work.id}`);
                });
                serviceChannel.trigger('update:journal')


            })
            .on('40x', function(response){
                console.log('done with error')
            })
            .on('500', function(response){
                console.log('server error')
            })
            .go();
    },
    updateButton: function(){
        if(this.collection.where({selected: true}).length > 0){
            this.getUI('makeWorks').prop('disabled', false);
        } else {
            this.getUI('makeWorks').prop('disabled', true);
        }
        return this;
    },
    onRender: function(){
        this.showChildView('works', new WorksTable({ collection: this.collection }));
        this.updateButton();
        this.listenTo(this.collection, 'checkwork', this.updateButton.bind(this));
    }
})