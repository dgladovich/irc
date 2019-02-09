import Marionette from 'backbone.marionette';
import Modal from './BotModal';

export default Marionette.View.extend({
    template: _.noop,
    tagName: 'img',
    className: 'img-responsive',
    attributes: {
        id: 'bot-service',
        src: '/images/icon-bender.png'
    },
    events: {
        'click': 'showMessageModal'
    },
    showMessageModal: function () {
        let modal = new Modal({
            model: new Backbone.Model({name: 'Персональный помощник'})
        });
        $('body').append(modal.render().el);
        modal.$('.modal.fade').modal();
    },
    onRender: function (){},
    initialize: function (){}
});