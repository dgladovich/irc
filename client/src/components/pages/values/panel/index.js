import { CollectionView, View } from 'backbone.marionette';
import template from './panel.jst';
import Radial from './radial';
import Linear from './linear';
import Status from './status';
import Value from './value';


// const Measurments = CollectionView.extend({
export default CollectionView.extend({
  childView(value) {
    switch (value.get('viewtype')) {
      case null:
      case 0:
        return Status;
      case 1:
        return Value;
      case 2:
        return Linear;
      case 3:
        return Radial;
      default:
        return View.extend({ template: _.noop });
    }
  },
});
// export default View.extend({
//   template,
//   regions: {
//     children: '.row',
//   },
//   onRender() {
//     this.showChildView('children', new Measurments({ collection: this.collection }));
//   },
// });
