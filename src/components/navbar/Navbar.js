import Marionette from 'backbone.marionette';
import template from './templates/navbar.jst';
import MessagesIcon from './MessagesIcon';
import AuthModalBox from './AuthModalBox';
import Bot from './Bot';
import moment from 'moment';
import store from 'store';
import Radio from 'backbone.radio';

const network = Radio.channel('network');
const individual = Radio.channel('individual');
const authChannel = Radio.channel('auth');


const NetworkActivityModel = Backbone.Model.extend({
    defaults: {
        status: true,
        statusTitle: 'Соединение установлено успешно'
    },
    initialize: function () {
        network.on('network:activity', (response) => {
            this.set(response)
        });
    }
})
const IndividualActivityModel = Backbone.Model.extend({
    defaults: {
        status: true,
        statusTitle: 'Соединение с устройством установлено'
    },
    initialize: function () {
        individual.on('individual:activity', (response) => {
            this.set(response)
        });
    }
})
const NetworkActivity = Marionette.View.extend({
    template: _.noop,
    className: 'glyphicon glyphicon-globe',
    tagName: 'span',
    attributes: {
        id: 'network'
    },
    model: new NetworkActivityModel,
    channelName: 'network',
    updateStatus: function () {
        this.model.get('status') === true ? this.$el.removeClass('offline') : this.$el.addClass('offline');
        this.$el.tooltip({
            placement: 'bottom',
            trigger: 'hover',
            title: () => {
                return this.model.get('statusTitle')
            },
        })
    },
    onRender: function () {
        this.updateStatus();

    },
    initialize: function () {
        this.listenTo(this.model, 'change:status', this.updateStatus.bind(this))
    }
})
const IndividualActivity = Marionette.View.extend({
    template: _.noop,
    className: 'glyphicon glyphicon-hdd',
    tagName: 'span',
    attributes: {
        id: 'individual'
    },
    model: new IndividualActivityModel,
    updateStatus: function () {
        this.model.get('status') === true ? this.$el.removeClass('offline') : this.$el.addClass('offline');
        this.$el.tooltip({
            placement: 'bottom',
            trigger: 'hover',
            title: () => {
                return this.model.get('statusTitle')
            },
        })
    },
    onRender: function () {
        this.updateStatus();

    },
    initialize: function () {
        if (app.controller.get('stat') === 9) {
            this.model.set({
                status: false,
                statusTitle: 'Устройство находится оффлайн'
            })
        }
        this.listenTo(this.model, 'change:status', this.updateStatus.bind(this))
    }
})

export default Marionette.View.extend({
    template: template,
    regions: {
        messages: {
            el: '.messages',
            replaceElement: true,
        },
        clocks: '#clockbox',
        network: {
            el: '#network',
            replaceElement: true
        },
        individual: {
            el: '#individual',
            replaceElement: true
        },
        bot: {
            el: '#bot-service',
            replaceElement: true
        },
        cloud: {
            el: '#cloud'
        }
    },
    events: {
        'click .user-name': 'onUserNameClick',
        'click #locale-ru': 'onChangeLocale',
        'click #locale-ua': 'onChangeLocale',
        'click #locale-en': 'onChangeLocale',
    },
    onChangeLocale: function (e) {
        e.preventDefault();
        let locale = e.currentTarget.id.split('-')[1];
        $.get(`config/locale/${locale}`).then(() => {
            document.location.reload();
        });
    },
    onUserNameClick: function () {
        this.authModalBox = new AuthModalBox();
        $('body').append(this.authModalBox.render().el);
        this.authModalBox.$('#login-modal').modal('show');
    },
    renderClock: function () {
        this.$('#clockbox').html(moment().format('DD.MM.YYYY HH:mm:ss'))
    },
    startClock: function () {
        this.clock = setInterval(this.renderClock.bind(this), 1000);
    },
    stopClock: function () {
        this.clearInterval(this.clock);
    },
    updateUserName: function () {
        let userName = 'Гость';
        let user = store.get('user');
        if (user) {
            userName = user.name;
        }
        this.$('#navbar-username').html(userName);
    },
    onRender: function () {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        this.showChildView('messages', new MessagesIcon());
        this.showChildView('network', new NetworkActivity());
        this.showChildView('individual', new IndividualActivity());
        this.showChildView('bot', new Bot());
        this.$('#cloud').tooltip({title: 'Связь с сервером', placement: 'bottom', trigger: 'hover'});
        this.startClock();
        this.updateUserName();
    },
    initialize: function () {
        this.listenTo(authChannel, 'change:auth', this.updateUserName.bind(this));
    }
});