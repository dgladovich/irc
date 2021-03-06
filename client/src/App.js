import { Application } from 'backbone.marionette';
import { history } from 'backbone';
import Noty from 'noty';
import { Router } from './components/Router';
import {
  prepareViewGroups, prepareFaces, prepareStatuses, preparePickList, computeDeviceSize,
} from './Utils';
import Controller from './models/Controller';
import UserCredentials from './models/UserCredentials';
import FacesCollection from './collections/FacesCollection';
import ControllersCollection from './collections/ControllersCollection';
import StatusesCollection from './collections/StatusesCollection';
import ViewGroupCollection from './collections/ViewGroupsCollection';
import AlarmsCollection from './collections/AlarmsCollection';
import ControllerConnection from './connections/ControllerConnection';
import BrokesCollection from './collections/BrokesCollection';

export default Application.extend({
  region: '#app',
  channelName: 'user',
  _fetchData: new Promise((resolve, reject) => {

  }),
  _notify() {
    new Noty({
      text: 'Ошибка при загрузке данных, попробуйте перезагрузить страницу',
      theme: 'metroui',
      type: 'error',
      layout: 'topCenter',
      killer: true,
      timeout: 3000,
      progressBar: false,
    }).show();
  },
  hidePreloader() { },
  showPreloader() { },
  onBeforeStart(data) {
    this.language = data.options[1];
    this.controller = new Controller(data.options[0].ctrl);
    this.picklist = new Backbone.Collection(preparePickList(this.controller.get('pickshit')));
    this.controllers = new ControllersCollection(data.options[0].ctrls);
    this.devices = this.controller.get('devs');
    this.deviceSize = computeDeviceSize(this.devices.length);
    this.deviceGroups = new Backbone.Collection(this.controller.get('dev_grps'));
    this.measurments = new Backbone.Collection(_.toArray(data.options[0].meas));
    this.faces = new FacesCollection(prepareFaces(this.devices));
    this.statuses = new StatusesCollection(prepareStatuses(data.options[0].statuses));
    this.errors = new Backbone.Collection(_.toArray(data.options[0].ecodes));
    this.users = new Backbone.Collection(data.options[0].usrs);
    this.viewgrps = new ViewGroupCollection(prepareViewGroups(data.options[0].viewgrps, this.faces));
    this.controllerConnection = new ControllerConnection();
    this.modes = new Backbone.Collection(_.toArray(this.controller.get('modes')));
    this.services = new Backbone.Collection();
    this.alarms = new AlarmsCollection();
    this.brokes = new BrokesCollection();
    this.credentials = new UserCredentials();
  },
  onStart(app, options) {
    this.router = new Router({
      app: this,
      options,
    });
    // this.controllerConnection = new ControllerConnection();
    history.start();
  },
  initialize() { },
});
