import { View } from 'backbone.marionette';
import { noop } from 'underscore';
import template from './buttonback.jst';
import './buttonback.scss';

export default View.extend({
  template,
  className: 'button-back ',
});
