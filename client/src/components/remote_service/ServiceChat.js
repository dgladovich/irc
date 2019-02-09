import template from './templates/chat.jst';
import {Model, Collection} from 'backbone';
import Radio from 'backbone.radio';
import {View} from 'backbone.marionette';
import store from 'store';

const authChannel = Radio.channel('auth');

export default View.extend({
    template: template,
    attributes: {
      id: 'service-chat'
    },
    events: {
        'click .chat-expander': 'toggleChat',
        'click #chat-unexpander': 'toggleChat'
    },
    toggleChat: function(){
        this.$el.toggleClass('chat-wrapped');
    },
    initialize: function(){
        this.listenTo(authChannel, 'change:auth', ()=>{
            if(!store.get('user')){ this.destroy()}
        } );
    }
});