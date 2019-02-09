import { Model, Collection } from 'backbone';
import Radio from 'backbone.radio';
import { View } from 'backbone.marionette';
import store from 'store';
import template from './templates/chat.jst';

const authChannel = Radio.channel('auth');

export default View.extend({
  template,
  attributes: {
    id: 'service-chat',
  },
  events: {
    'click .chat-expander': 'toggleChat',
    'click #chat-unexpander': 'toggleChat',
  },
  toggleChat() {
    this.$el.toggleClass('chat-wrapped');
  },
  initialize() {
    this.listenTo(authChannel, 'change:auth', () => {
      if (!store.get('user')) { this.destroy(); }
    });
  },
});
