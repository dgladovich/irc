import { View } from 'backbone.marionette';

export default View.extend({
  tagName: 'span',
  className: 'glyphicon glyphicon-tasks offline',
  events: {
    hover: 'handleHoverIcon',
  },
  handleHoverIcon(evt) { },
});
