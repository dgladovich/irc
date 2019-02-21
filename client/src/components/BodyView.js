import _ from 'underscore';
import { View, Model } from 'backbone.marionette';
import { history } from 'backbone';
import store from 'store';
import Radio from 'backbone.radio';
import Navbar from './navbar/Navbar';
import Menu from './menu/Menu';
import IndividualPage from './individual/IndividualPage';
import AuthModalBox from './navbar/AuthModalBox';
import ValuesPage from './values/ValuesPage';
import VisualPage from './visual/VisualPage';
import CameraModal from './visual/CameraModal';
import MiniVisual from './visual/MiniVisual';
import JournalPage from './journal/JournalPage';
import EquipmentPage from './equipment/EquipmentPage';
import PassportPage from './passport/PassportPage';
import TestPage from './testing/TestPage';
import SystemControllPage from './system/SystemControllPage';
import ServicePage from './service/ServicePage';
import DevicesPage from './devices/DevicesPage';
import ServiceChat from './remote_service/ServiceChat';
// import template from './general/templates/BodyTemplate.jst';
const template = () => {
  return `
  <header></header>
  <div id="content"></div>
`;
};

export const BodyView = View.extend({
  template,
  className: 'wrapper',
  isVisualActive: false,
  events: {
    'click .fingerprint': 'showAuthModal',
  },
  regions: {
    main: {
      el: '#content',
      replaceElement: true,
    },
    navbar: {
      el: 'header',
      replaceElement: true,
    },

  },
  showAuthModal() {
    this.authModalBox = new AuthModalBox();
    $('body').append(this.authModalBox.render().el);
    this.authModalBox.$('#login-modal').modal('show');
  },
  onRender() {
    this.showChildView('navbar', new Navbar());
  },

  showIndex() {
    this.showChildView('main', new Menu());
    /*        let menu = this.getChildView('main');
         this.$el.fadeIn('slow'); */
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
  // showJournal() {
  //   this.showChildView('main', new JournalPage());
  //   history.navigate('journal'); // Update the location bar
  // },
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
  showTest() {
    this.showChildView('main', new TestPage());
    history.navigate('testing'); // Update the location bar
  },
  // showDevices() {
  //   const grps = app.deviceGroups;
  //   const devicesCollection = new Backbone.Collection();
  //   const parent = app.devices.findWhere({ parent: null });
  //   const bodyId = parent.get('body_id');
  //   const deviceSize = parent.get('devicesize');
  //   const deviceType = parent.get('typ');
  //   grps.each(grp => grp.set({
  //     devices: new Backbone.Collection(),
  //     presentation: 'group',
  //     typ: deviceType,
  //     devicesize: deviceSize,
  //   }));

  //   const devs = app.devices.each((device) => {
  //     const devgrp = grps.findWhere({ id: device.get('grp') });
  //     if (device.get('visible') === 0) { return; }
  //     if (devgrp) {
  //       devgrp.get('devices').add(device);
  //       devgrp.set('sgrp', device.get('sgrp'));
  //       devicesCollection.add(devgrp);
  //     } else if (device.get('id') === bodyId) {
  //       device.set('presentation', 'central');
  //       devicesCollection.add(device);
  //     } else {
  //       const faces = app.faces.where({
  //         dev: device.get('id'),
  //       });
  //       device.set({
  //         presentation: 'controller',
  //         faces: new Backbone.Collection(faces),
  //       });
  //       devicesCollection.add(device);
  //     }
  //   });
  //   const devicesPage = new DevicesPage({ data: devicesCollection });
  //   this.showChildView('main', devicesPage);
  //   this.$el.fadeIn();
  //   history.navigate('devices'); // Update the location bar
  // },
  showMiniWindow(image) {
    const visual = new MiniVisual(image);
    $('body').append(visual.render().el);
  },
  showVisualModal(image) {
    const visual = new CameraModal(image);
    $('body').append(visual.render().el);
  },
  showMessage() {
    this.showChildView('main', new MessagesPage());
    history.navigate('messages'); // Update the location bar
  },
  toggleServiceWindow() {
    if (store.get('user')) {
      $('body').append(new ServiceChat().render().el);
    }
  },
  initialize() {
    // this.toggleServiceWindow();
    //this.devicesPage = new DevicesPage();
    // this.listenTo(authChannel, 'change:auth', this.toggleServiceWindow.bind(this))
  },
});
