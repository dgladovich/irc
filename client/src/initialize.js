import App from './App';
import './assets/css/index.scss';

export default function () {
  document.addEventListener('DOMContentLoaded', () => {
    window.smart = new App();
  });
}
