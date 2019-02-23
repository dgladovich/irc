import { View } from 'backbone.marionette';
import { noop } from 'underscore';

export default View.extend({
  template: noop,
  tagName: 'span',
  className: 'glyphicon glyphicon-hdd',
  events: {
    hover: 'handleHoverIcon',
  },
  handleHoverIcon(evt) { },
});
