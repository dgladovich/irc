import template from './templates/exit_form.jst';
import { Model, Collection } from 'backbone';
import Radio from 'backbone.radio';
import {View} from 'backbone.marionette';
import store from 'store';
import Noty from 'noty';

const authChannel = Radio.channel('auth');

export default View.extend({
    template: template,
    events: {
        'click #btn-logout': 'logOut',

    },
    logOut: function (e) {
        e.preventDefault();
        store.remove('user');
        store.remove('token');
        authChannel.trigger('change:auth');


    },
    initialize: function () {
        this.model = new Backbone.Model({
            name: store.get('user').name
        })
    }
});
