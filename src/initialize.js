import './styles/application.scss';
import App from './components/App';
import Bootstrap from 'bootstrap';
import Noty from 'noty';
import {loadJSONData, hidePreloader} from './Utils';
import store from 'store';

const backboneSync = Backbone.sync;


Backbone.sync = function (method, model, options) {
    /*
     * The jQuery `ajax` method includes a 'headers' option
     * which lets you set any headers you like
     */
    options.headers = {
        /*
         * Set the 'Authorization' header and get the access
         * token from the `auth` module
         */
        'Authorization': 'Bearer ' + store.get('token')
    };
    backboneSync('peer to peer', 'dasfd');
    /*
     * Call the stored original Backbone.sync method with
     * extra headers argument added
     */
    return backboneSync(method, model, options);
};
document.addEventListener('DOMContentLoaded', () => {

    //store.clearAll();
    loadJSONData()
        .then((data) => {
            hidePreloader();
            const app = new App(data);
            window.app = app;
            app.start(data);

        })
        .catch(err => {
            console.log(err)
            new Noty({
                text: `Ошибка при загрузке данных, попробуйте перезагрузить страницу`,
                theme: 'metroui',
                type: 'error',
                layout: 'topCenter',
                killer: true,
                timeout: 3000,
                progressBar: false
            }).show();
        });
});

if (module.hot) {
    module.hot.accept();
}
