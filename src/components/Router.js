import Mn from 'backbone.marionette';
import { BodyView } from './BodyView';
import { checkAuth, checkPermissions } from '../Utils';

const Controller = Mn.Object.extend({

    initialize() {
        this.layout = new BodyView();
        const app = this.getOption('app');
        this.options = this.getOption('options');
        app.showView(this.layout);
    },

    index() {
        this.layout.showIndex();
    },
    showIndividual() {
        this.layout.showIndividual();
    },
    showValues() {
        this.layout.showValues();
    },
    showCurrent() {
        this.layout.showCurrent();
    },
    showVisual() {
        this.layout.showVisual();
    },
    showJournal() {
        this.layout.showJournal();
    },
    showPassport() {
        this.layout.showPassport();
    },
    showService() {
        this.layout.showService();
    },
    showDevices() {
        this.layout.showDevices(this.options);
    },    
    showSystemControll() {
        this.layout.showSystemControll();
    },    
    showMessages() {
        this.layout.showMessages();
    },
    showTest() {
        this.layout.showTest();
    }

});

export const Router = Mn.AppRouter.extend({
    initialize() {
        this.controller = new Controller(this.options);
    },

    appRoutes: {
        '': 'index',
        'individual': 'showIndividual',
        'values': 'showValues',
        'current': 'showCurrent',
        'journal': 'showJournal',
        'passport': 'showPassport',
        'visual': 'showVisual',
        'messages': 'showMessages',
        'service': 'showService',
        'system': 'showSystemControll',
        'devices': 'showDevices',
        'testing': 'showTest',
    }
});