import { View } from 'backbone.marionette';
import { Collection } from 'backbone';
import template from './tabcontent.jst';

export default View.extend({
  template,
  regions: {
    children: '.row',
  },
  onRender() {
    const ChildModel = this.model.get('model');
    const ChildCollection = new Collection(this.model.get('collection'));
    const Children = this.model.get('view');
    const children = new Children({ model: ChildModel, collection: ChildCollection });
    this.showChildView('children', children);
  },
});
