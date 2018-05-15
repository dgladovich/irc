import JournalItem from '../models/JournalModel';

export default Backbone.Collection.extend({
    model: JournalItem,
    initialize: function() {
        this.url = 'journal';
    }
});