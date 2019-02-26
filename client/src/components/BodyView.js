import _ from 'underscore';
import { View } from 'backbone.marionette';
import { Collection, history } from 'backbone';
import Radio from 'backbone.radio';
import template from './body.jst';
import Navbar from './navbar';
import ValuesPanel from './pages/values';
// import BrokesPanel from './pages/journal';
// import JournalPanel from './pages/brokes';
import MeasurmentsPanel from './pages/values/panel';
import Equipment from './pages/equipment';
import Passport from './pages/passport';
import Menu from './menu';
import Page from './ui/page';
import Table from './ui/table';
import IndividualPage from './individual/IndividualPage';
//import VisualPage from './visual/VisualPage';
//import CameraModal from './visual/CameraModal';
//import MiniVisual from './visual/MiniVisual';
//import JournalPage from './journal/JournalPage';
//import EquipmentPage from './equipment/EquipmentPage';
//import PassportPage from './passport/PassportPage';
//import TestPage from './testing/TestPage';
//import SystemControllPage from './system/SystemControllPage';
//import ServicePage from './service/ServicePage';
//import DevicesPage from './devices/DevicesPage';
//import ServiceChat from './remote_service/ServiceChat';
window.View = View;

export const BodyView = View.extend({
  template,
  className: 'wrapper',
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
  onRender() {
    this.showChildView('navbar', new Navbar());
  },

  showIndex() {
    this.showChildView('main', new Menu());
    this.$el.fadeIn('slow');
    history.navigate('#'); // Update the location bar
  },
  showIndividual() {
    this.showChildView('main', new IndividualPage());
    history.navigate('individual'); // Update the location bar
  },
  showValues() {
    const { store } = window.smart;
    const faces = store.get('faces');
    const groups = store.get('devicesgroups');

    const valuesgroups = groups.map((group) => {
      const groupfaces = faces.where({ viewgrp: group.get('id') });
      return {
        id: group.get('id'),
        name: group.get('name'),
        title: group.get('name'),
        view: MeasurmentsPanel,
        collection: groupfaces,
        length: groupfaces.length,
      };
    }).filter(group => group.length);

    this.showChildView('main', new Page({
      children: new ValuesPanel({ tabs: valuesgroups }),
    }));
    history.navigate('values'); // Update the location bar
  },
  showVisual() {
    history.navigate('visual'); // Update the location bar
  },
  showJournal() {
    // this.showChildView('main', new JournalPage());
    const { store } = window.smart;
    // const journal = store.get('journals');
    // const brokes = store.get('brokes');
    // const tabs = [
    //   {
    //     id: 'brokes',
    //     title: 'Brokes',
    //     view: BrokesPanel,
    //     collection: brokes,
    //   },
    //   {
    //     id: 'events',
    //     title: 'Journal',
    //     view: JournalPanel,
    //     collection: journal,
    //   },
    // ];
    this.showChildView('main', new Page({
      children: new Table({
        columns: [
          {
            title: '#',
            datapath: 'title',
          },
          {
            title: 'Status',
            datapath: 'stat',
          },
        ],
        options: {},
        data: [
          {
            title: 'pisos',
            stat: 'active',
          },
          {
            title: 'pisos2',
            stat: 'unactive',
          },
        ],
      }),
    }));
    history.navigate('journal'); // Update the location bar
  },
  showCurrent() {
    this.showChildView('main', new Page({
      children: new Equipment(),
    }));
    history.navigate('current'); // Update the location bar
  },
  showPassport() {
    this.showChildView('main', new Passport());
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
  initialize() {
    // this.toggleServiceWindow();
    //this.devicesPage = new DevicesPage();
    // this.listenTo(authChannel, 'change:auth', this.toggleServiceWindow.bind(this))
  },
});
