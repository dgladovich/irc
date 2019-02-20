import App from './App';
import './assets/css/index.scss';

export default function () {
  document.addEventListener('DOMContentLoaded', () => {
    const smart = new App();
    console.log('assigning to window');
    window.smart = smart;
  });
}
