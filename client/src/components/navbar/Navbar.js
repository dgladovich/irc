import Marionette from 'backbone.marionette';
import moment from 'moment';
import { t } from 'i18next';
import Radio from 'backbone.radio';

import template from './templates/navbar.jst';
import MessagesIcon from './MessagesIcon';
import AuthModalBox from './AuthModalBox';
import NetworkActivity from './NetworkActivity';
import IndividualActivity from './IndividualActivity';
import Bot from './Bot';

const authChannel = Radio.channel('auth');

export default Marionette.View.extend({
  template,
  tagName: 'header',
  regions: {
    messages: {
      el: '.messages',
      replaceElement: true,
    },
    clocks: '#clockbox',
    network: {
      el: '#network',
      replaceElement: true,
    },
    individual: {
      el: '#individual',
      replaceElement: true,
    },
    logout: {
      el: '#logout',
      replaceElement: true,
    },
    bot: {
      el: '#bot-service',
      replaceElement: true,
    },
    cloud: {
      el: '#cloud',
    },
  },
  events: {
    // 'click .user-name': 'onUserNameClick',
    'click #locale-ru': 'onChangeLocale',
    'click #locale-ua': 'onChangeLocale',
    'click #locale-en': 'onChangeLocale',
  },
  onChangeLocale(e) {
    e.preventDefault();
    const locale = e.currentTarget.id.split('-')[1];
    $.get(`config/locale/${locale}`).then(() => {
      document.location.reload();
    });
  },
  onUserNameClick() {
    this.authModalBox = new AuthModalBox();
    $('body').append(this.authModalBox.render().el);
    this.authModalBox.$('#login-modal').modal('show');
  },
  renderClock() {
    this.$('#clockbox').html(moment().format('DD.MM.YYYY HH:mm:ss'));
  },
  startClock() {
    this.clock = setInterval(this.renderClock.bind(this), 1000);
  },
  stopClock() {
    this.clearInterval(this.clock);
  },
  updateUserName() {
    const userName = t('user_guest');
    // app.credentials.fetch()
    //   .then((data) => {
    //     if (data.auth) {
    //       this.$('#navbar-username').html(data.name);
    //     } else {
    //       document.location.href = 'login/logout';
    //     }
    //   })
    //   .fail((e) => {
    //     console.log('Error while fetching credentials');
    //   });
    this.$('#navbar-username').html(userName);
  },
  onRender() {
    this.showChildView('messages', new MessagesIcon());
    this.showChildView('network', new NetworkActivity());
    this.showChildView('individual', new IndividualActivity());
    this.showChildView('bot', new Bot());
    //this.$('#cloud').tooltip({ title: t('connection_with_server'), placement: 'bottom', trigger: 'hover' });
    this.startClock();
    this.updateUserName();
  },
  initialize() {
    this.listenTo(authChannel, 'change:auth', this.updateUserName.bind(this));
  },
});
