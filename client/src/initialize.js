import 'bootstrap/js/dist/dropdown';
import 'webpack-icons-installer/font-awesome';
import 'webpack-icons-installer/bootstrap';
import './assets/css/index.scss';
import App from './App';

export default function () {
  document.addEventListener('DOMContentLoaded', () => {
    window.smart = new App();
  });
}
