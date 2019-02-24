import { View, CollectionView } from 'backbone.marionette';
import template from './valves.jst';
import Valve from './valve';

const Valves = CollectionView.extend({
  childView: Valve,
  filter(child) {
    return !!child.get('active');
  },
  childViewOptions(model, index) {
    return model.set({
      list_index: index + 1,
      valveStatus: '',
    });
  },
});


export default View.extend({
  template,
  regions: {
    valves: {
      el: '.row',
    },
  },
  onRender() {
    this.showChildView('valves', new Valves({ collection: this.collection }));
  },
});
