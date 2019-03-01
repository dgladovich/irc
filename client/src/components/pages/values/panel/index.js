import { CollectionView, View } from 'backbone.marionette';
import Radial from './radial';
import Linear from './linear';
import Status from './status';
import Value from './value';

export default CollectionView.extend({
  className: 'values-content',
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
