import { View, CollectionView, Model } from 'backbone.marionette';
import template from './templates/materials_view.jst';
import empty_template from './templates/material_empty_item.jst';
import Material from './Material';

const EmptyMaterial = View.extend({
  template: empty_template,
  className: 'custom-table-row',
});

const MaterialsList = CollectionView.extend({
  childView: Material,
  emptyView: EmptyMaterial,

});
export default View.extend({
  template,
  regions: {
    materials: {
      el: '#materials',
    },
  },
  onRender() {
    this.showChildView('materials', new MaterialsList({
      collection: this.collection,
    }));
  },

});
