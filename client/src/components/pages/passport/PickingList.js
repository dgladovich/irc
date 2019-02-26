import { View, Model } from 'backbone.marionette';
import template from './templates/picking.jst';
import PickingListTable from './PickingListTable';


export default View.extend({
  template,
  regions: {
    content: {
      el: '.passport-scroller',
    },
  },
  onRender() {
    this.showChildView('content', new PickingListTable({ collection: app.picklist }));
  },
});
