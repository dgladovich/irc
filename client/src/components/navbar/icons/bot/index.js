import { View } from 'backbone.marionette';
import { noop } from 'underscore';

export default View.extend({
  template: noop,
  tagName: 'i',
  className: 'glyphicon glyphicon-eye-open',
  events: {
    hover: 'handleHoverIcon',
  },
  handleHoverIcon(evt) { },
});
