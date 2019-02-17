import { Application } from 'backbone.marionette';
import { history } from 'backbone';
import Noty from 'noty';
import { Router } from './components/Router';
import Store from './store';
import UserPreferences from './preferences';
import initLocalization from './i18n';

export default Application.extend({
  region: '#app',
  channelName: 'user',
  _notify() {
    new Noty({
      text: 'Ошибка при загрузке данных, попробуйте перезагрузить страницу',
      theme: 'metroui',
      type: 'error',
      layout: 'topCenter',
      killer: true,
      timeout: 3000,
      progressBar: false,
    }).show();
  },
  authUser() { },
  changeLocales() { },
  setTheme() { },
  hidePreloader() { },
  showPreloader() { },
  updateUserPreferences() { },
  async onBeforeStart(options) {
    await this.store.initialize;
    await initLocalization(this.language);
    this.triggerMethod('start', options);
  },
  onStart(app, options) {
    this.router = new Router({
      app: this,
      options,
    });
    history.start();
  },
  initialize(options) {
    this.store = new Store();
    this.preferences = new UserPreferences();
    this.language = this.preferences.language || window.navigator.language || window.navigator.userLanguage || 'ru';
    this.triggerMethod('before:start', this, options);
  },
});
