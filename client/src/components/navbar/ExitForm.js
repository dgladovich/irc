import { Model, Collection } from 'backbone';
import Radio from 'backbone.radio';
import { View } from 'backbone.marionette';
import store from 'store';
import Noty from 'noty';
import template from './templates/exit_form.jst';

const authChannel = Radio.channel('auth');

export default View.extend({
  template,
  events: {
    'click #btn-logout': 'logOut',

  },
  logOut(e) {
    e.preventDefault();
    store.remove('user');
    store.remove('token');
    authChannel.trigger('change:auth');
  },
  initialize() {
    this.model = new Backbone.Model({
      name: store.get('user').name,
    });
  },
});
