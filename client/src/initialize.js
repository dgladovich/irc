import { View } from 'backbone.marionette';
import { html } from 'lit-html';
import App from './App';
import './assets/css/index.scss';

View.setRenderer((template, data) => html(template, data).strings);
export default function () {
  document.addEventListener('DOMContentLoaded', () => {
    const smart = new App();
    window.smart = smart;
  });
}
