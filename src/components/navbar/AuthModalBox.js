import template from './templates/authmodal.jst';
import {Model, Collection} from 'backbone';
import Radio from 'backbone.radio';
import {View} from 'backbone.marionette';
import LoginForm from './LoginForm';
import ExitForm from './ExitForm';
import store from 'store';
import Noty from 'noty';

const authChannel = Radio.channel('auth');

export default View.extend({
    template: template,
    events: {
        'click .btn-closemodal': 'close',
        'click #login': 'login',
        'keyup #password': 'setPassword',
        'change #username': 'setName'
    },
    regions: {
        table: {
            el: '.modal-body'
        }
    },
    updateForm: function(){
        if(store.get('user')){
            this.showChildView('table', new ExitForm());
        } else {
            this.showChildView('table', new LoginForm());
        }
    },
    onRender: function () {
        this.$('#login-modal').on('hidden.bs.modal', () => {this.destroy()});
        this.updateForm();
    },
    initialize: function(){
        this.listenTo(authChannel, 'change:auth', this.updateForm.bind(this));
    }
});