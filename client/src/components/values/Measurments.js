import { CollectionView, View } from 'backbone.marionette';
import template from './templates/measurments.jst';
import Radial from './Radial';
import Linear from './Linear';
import Status from './Status';
import Value from './Value';


const Measurments = CollectionView.extend({
  childView(value) {
    switch (value.get('viewtype')) {
    case null:
    case 0:
    {
      return Status;
      break;
    }
    case 1:
    {
      return Value;
      break;
    }
    case 2:
    {
      return Linear;
      break;
    }
    case 3:
    {
      return Radial;
      break;
    }
    default:
      return View.extend({ template: _.noop });
    }
  },
});
export default View.extend({
  template,
  regions: {
    content: '.row',
  },
  onRender() {
    this.showChildView('content', new Measurments({ collection: this.collection }));
  },
});
