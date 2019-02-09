import { Model, Collection } from 'backbone';
import Radio from 'backbone.radio';
import { View } from 'backbone.marionette';
import store from 'store';
import Noty from 'noty';
import aja from 'aja';
import template from './templates/login_form.jst';

const authChannel = Radio.channel('auth');
const error_while_auth = 'error_while_auth';
const UserModel = Model.extend({
  urlRoot() {
    return 'login';
  },
  defaults: {
    password: '',
    name: '',
  },

});
const UsersCollection = Collection.extend({
  url: 'login/users',
});
export default View.extend({
  template,
  events: {
    'click .btn-closemodal': 'close',
    'click #login': 'login',
    'keyup #password': 'setPassword',
    'change #username': 'setName',
  },
  login(e) {
    e.preventDefault();
    this.$('#login').attr('disabled', true);
    aja()
      .method('post')
      .url('login')
      .cache(false)
      .body(this.userModel.toJSON())
      .on('200', (user) => {
        if (user.auth && user.token) {
          store.set('user', user.user);
          store.set('token', user.token);
          this.$('#login').attr('disabled', false);
          authChannel.trigger('change:auth');
        }
      })
      .on('40x', (response) => {
        console.log('Some errors while authorization');
      })
      .on('500', (response) => {
        console.log('some server errors');
        new Noty({
          text: app.language[error_while_auth] || error_while_auth,
          theme: 'metroui',
          type: 'error',
          layout: 'topCenter',
          killer: true,
          timeout: 3000,
          progressBar: false,
        }).show();
      })
      .go();
    /*        this.userModel
            .save()
            .then((user) => {
                if (user.auth && user.token) {
                    store.set('user', user.user);
                    store.set('token', user.token);
                    this.$('#login').attr('disabled', false);
                    authChannel.trigger('change:auth')
                }
            })
            .fail((err) => {
                new Noty({
                    text: 'Ошибка при авторизации',
                    theme: 'metroui',
                    type: 'error',
                    layout: 'topCenter',
                    killer: true,
                    timeout: 3000,
                    progressBar: false
                }).show();
            }) */
  },
  setPassword(e) {
    this.userModel.set('password', $(e.currentTarget).val());
  },
  setName(e) {
    this.userModel.set('name', +$(e.currentTarget).val());
  },
  checkButton() {
    if (this.userModel.get('password').length < 3 || this.userModel.get('name') === void (0)) {
      this.$('#login').attr('disabled', true);
    } else {
      this.$('#login').attr('disabled', false);
    }
  },
  onRender() {
    this.userLogins.each((user) => {
      this.$('#username').append(`<option value="${user.get('id')}">${user.get('name')}</option>`);
    });
  },
  initialize() {
    this.userLogins = app.users;
    this.userModel = new UserModel();
    this.listenTo(this.userModel, 'change', (e) => {
      this.checkButton();
    });
  },
});
