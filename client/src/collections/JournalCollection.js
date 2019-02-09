import JournalItem from '../models/JournalModel';

export default Backbone.Collection.extend({
  model: JournalItem,
  initialize() {
    this.url = 'journal';
  },
});
