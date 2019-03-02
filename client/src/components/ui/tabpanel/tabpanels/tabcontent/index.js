import { View } from 'backbone.marionette';
import { Collection } from 'backbone';
import template from './tabcontent.jst';
import './tabpanel.scss';

export default View.extend({
  template,
  className: 'tab-pane fade',
  regions: {
    children: {
      el: '.row',
      replaceElement: true,
    },
  },
  onRender() {
    const ChildModel = this.model.get('model');
    const ChildCollection = new Collection(this.model.get('collection'));
    const Children = this.model.get('view');
    const children = new Children({ model: ChildModel, collection: ChildCollection });
    this.showChildView('children', children);
  },
});
