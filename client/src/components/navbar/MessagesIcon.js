import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import template from './templates/messages.jst';
import Modal from './Modal';
import FilterModel from './models/FilterJournalModel';

export default Marionette.View.extend({
  template,
  collection: new Backbone.Collection(),
  filterModel: new FilterModel(),
  events: {
    click: 'showMessageModal',
  },
  showMessageModal() {
    const modal = new Modal({ model: this.model, collection: this.collection });
    $('body').append(modal.render().el);
    modal.$('.modal.fade').modal('show');
  },
  updateCount() {
    this.$el.removeClass(this.previousClass);

    if (this.collection.length) {
      this.previousClass = 'danger';
    } else {
      this.previousClass = '';
    }
    this.$('.msg-qtty').html(this.collection.length);
    this.$el.addClass(this.previousClass);
    return this;
  },
  onRender() {
    // Get rid of that pesky wrapping-div.
    // Assumes 1 child element present in template.
    this.$el = this.$el.children();
    // Unwrap the element to prevent infinitely
    // nesting elements during re-render.
    this.$el.unwrap();
    this.setElement(this.$el);
  },
  initialize() {
    this.previousClass = '';
    this.model = new Backbone.Model({
      name: 'Сообщения',
    });
    this.collection = app.alarms;
    this.listenTo(this.collection, 'remove', this.updateCount.bind(this));
    this.listenTo(this.collection, 'add', this.updateCount.bind(this));
    this.listenTo(this.collection, 'reset', this.updateCount.bind(this));
  },
});
