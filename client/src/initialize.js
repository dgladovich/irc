import './styles/application.scss';
import Bootstrap from 'bootstrap';
import store from 'store';
import Noty from 'noty';
import { loadJSONData, hidePreloader } from './Utils';
import App from './components/App';

const backboneSync = Backbone.sync;

$.ajaxSetup({
  headers: {
    Authorization: `Bearer ${store.get('token')}`,
  },
});
document.addEventListener('DOMContentLoaded', () => {
  loadJSONData()
    .then((data) => {
      hidePreloader();
      const app = new App(data);
      window.app = app;
      app.start(data);
    })
    .catch((err) => {
      console.log(err);
      new Noty({
        text: 'Ошибка при загрузке данных, попробуйте перезагрузить страницу',
        theme: 'metroui',
        type: 'error',
        layout: 'topCenter',
        killer: true,
        timeout: 3000,
        progressBar: false,
      }).show();
    });
});

if (module.hot) {
  module.hot.accept();
}
