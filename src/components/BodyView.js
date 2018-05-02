import {View, Model} from 'backbone.marionette';
import template from './general/templates/BodyTemplate.jst';
import {history} from 'backbone';
import Navbar from './navbar/Navbar';
import Menu from './menu/Menu';
import store from 'store';
import IndividualPage from './individual/IndividualPage';
import AuthModalBox from './navbar/AuthModalBox';
import ValuesPage from './values/ValuesPage';
import VisualPage from './visual/VisualPage';
import CameraModal from './visual/CameraModal';
import MiniVisual from './visual/MiniVisual';
import JournalPage from './journal/JournalPage';
import EquipmentPage from './equipment/EquipmentPage';
import PassportPage from './passport/PassportPage';
import SystemControllPage from './system/SystemControllPage';
import ServicePage from './service/ServicePage';
import DevicesPage from './devices/DevicesPage';
import ServiceChat from './remote_service/ServiceChat';
import Radio from 'backbone.radio';

const visualChannel = Radio.channel('visual');
const authChannel = Radio.channel('auth');

export const BodyView = View.extend({
    template,
    isVisualActive: false,
    events: {
        'click .fingerprint': 'showAuthModal'
    },
    regions: {
        main: {
            el: '#content',
            replaceElement: true
        },
        navbar: {
            el: 'header',
            replaceElement: true
        },

    },
    showAuthModal: function () {
        this.authModalBox = new AuthModalBox();
        $('body').append(this.authModalBox.render().el);
        this.authModalBox.$('#login-modal').modal('show');
    },
    onRender: function () {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);

        this.showChildView('navbar', new Navbar());
    },

    showIndex() {
        this.showChildView('main', new Menu());
        /*        let menu = this.getChildView('main');
         this.$el.fadeIn('slow');*/
        history.navigate('#'); // Update the location bar
    },
    showIndividual() {
        this.showChildView('main', new IndividualPage());
        history.navigate('individual'); // Update the location bar
    },
    showValues() {
        this.showChildView('main', new ValuesPage());
        history.navigate('values'); // Update the location bar
    },
    showVisual() {
        this.showChildView('main', new VisualPage());
        history.navigate('visual'); // Update the location bar
    },
    showJournal() {
        this.showChildView('main', new JournalPage());
        history.navigate('journal'); // Update the location bar
    },
    showCurrent() {
        this.showChildView('main', new EquipmentPage());
        history.navigate('current'); // Update the location bar
    },
    showPassport() {
        this.showChildView('main', new PassportPage());
        history.navigate('passport'); // Update the location bar
    },
    showSystemControll() {
        this.showChildView('main', new SystemControllPage());
        history.navigate('system'); // Update the location bar
    },
    showService() {
        this.showChildView('main', new ServicePage());
        history.navigate('service'); // Update the location bar
    },
    showDevices() {
        let grps = app.deviceGroups;
        let devicesCollection = new Backbone.Collection();
        let parent = app.devices.findWhere({parent: 0});
        let bodyId = parent.get('body_id');
        let deviceSize = parent.get('devicesize');
        let deviceType = parent.get('typ');
        grps.each(grp => grp.set({
            devices: new Backbone.Collection(),
            presentation: 'group',
            typ: deviceType,
            devicesize: deviceSize
        }));

        let devs = app.devices.each(device => {
            const devgrp = grps.findWhere({id: device.get('grp')});
            if (device.get('visible') === 0) {return};
            if (devgrp) {
                devgrp.get('devices').add(device);
                devgrp.set('sgrp', device.get('sgrp'));
                devicesCollection.add(devgrp);
            } else {
                if(device.get('id') === bodyId){
                    device.set('presentation', 'central');
                    devicesCollection.add(device);
                } else {
                    let faces = app.faces.where({
                        dev: device.get('id')
                    });
                    device.set({
                        presentation: 'device',
                        faces: new Backbone.Collection(faces)
                    });
                    devicesCollection.add(device);
                }
            }
        });
        let devicesPage = new DevicesPage({data: devicesCollection});
        this.showChildView('main', devicesPage);
        this.$el.fadeIn();
        history.navigate('devices'); // Update the location bar
    },
    showMiniWindow(image) {
        const visual = new MiniVisual(image)
        $('body').append(visual.render().el);
        visualChannel.once('visual:modal:open', () => {
            visual.destroy()
        })
    },
    showVisualModal(image) {
        const visual = new CameraModal(image)
        $('body').append(visual.render().el);
    },
    showMessage() {
        this.showChildView('main', new MessagesPage());
        history.navigate('messages'); // Update the location bar
    },
    toggleServiceWindow() {
        if(store.get('user')){
            $('body').append(new ServiceChat().render().el);
        }
    },
    initialize: function () {
        //this.toggleServiceWindow();
        this.devicesPage = new DevicesPage();
        //this.listenTo(authChannel, 'change:auth', this.toggleServiceWindow.bind(this))
        visualChannel.on('roll-up', (image) => {
            this.isVisualActive = true;
            this.showMiniWindow(image)
        });
        visualChannel.on('visual:modal:open', (opt) => {
            this.showVisualModal(opt);
        });
        visualChannel.on('roll-out', (image) => {
            this.isVisualActive = false;
            this.showVisualModal(image)
        })
    }
});