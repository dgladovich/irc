import { Model } from 'backbone';
import { CONFIG_URL, BASE_URL } from '../constants';
import preprocessData from './preprocessdata';
import Alarms from './collections/Alarms';
import Analitics from './collections/Analitic';
import Brokes from './collections/Brokes';
import Cameras from './collections/Cameras';
import Controllers from './collections/Controllers';
import DeviceGroups from './collections/DeviceGroups';
import Devices from './collections/Devices';
import Errors from './collections/Errors';
import Faces from './collections/Faces';
import Informer from './collections/Informers';
import Journals from './collections/Journals';
import Modes from './collections/Modes';
import Services from './collections/Services';
import Statuses from './collections/Statuses';
import StatusesStructures from './collections/StatusesStructures';
import ViewGroups from './collections/ViewGroups';
import UserCredentials from './models/UserCredentials';
import Controller from './models/Controller';

export default Model.extend({
  baseUr: BASE_URL,
  configUrl: CONFIG_URL,
  _fetchConfig() { },
  _fetchLocales() { },
  _validateData() { },
  _preprocessData() { },
  _initConnections() { },
  persistStore() { },
  checkCacheConsistance() { },
  _initCollections() {
    this.alarms = new Alarms();
    this.analitics = new Analitics();
    this.brokes = new Brokes();
    this.cameras = new Cameras();
    this.controllers = new Controllers();
    this.controller = new Controller();
    this.deviceGroups = new DeviceGroups();
    this.devices = new Devices();
    this.errors = new Errors();
    this.faces = new Faces();
    this.informers = new Informer();
    this.journals = new Journals();
    this.modes = new Modes();
    this.services = new Services();
    this.statuses = new Statuses();
    this.statusesStructures = new StatusesStructures();
    this.viewGroups = new ViewGroups();
    this.user = new UserCredentials();
  },

  async initialize() {
    await this._fetchConfig();
    await this._preprocessData();
    await this._initCollections();
    await this._initConnections();
    // this.language = data.options[1];
    // this.controller = new Controller(data.options[0].ctrl);
    // this.picklist = new Backbone.Collection(preparePickList(this.controller.get('pickshit')));
    // this.controllers = new ControllersCollection(data.options[0].ctrls);
    // this.devices = this.controller.get('devs');
    // this.deviceSize = computeDeviceSize(this.devices.length);
    // this.deviceGroups = new Backbone.Collection(this.controller.get('dev_grps'));
    // this.measurments = new Backbone.Collection(_.toArray(data.options[0].meas));
    // this.faces = new FacesCollection(prepareFaces(this.devices));
    // this.statuses = new StatusesCollection(prepareStatuses(data.options[0].statuses));
    // this.errors = new Backbone.Collection(_.toArray(data.options[0].ecodes));
    // this.users = new Backbone.Collection(data.options[0].usrs);
    // this.viewgrps = new ViewGroupCollection(prepareViewGroups(data.options[0].viewgrps, this.faces));
    // this.controllerConnection = new ControllerConnection();
    // this.modes = new Backbone.Collection(_.toArray(this.controller.get('modes')));
    // this.services = new Backbone.Collection();
    // this.alarms = new AlarmsCollection();
    // this.brokes = new BrokesCollection();
    // this.credentials = new UserCredentials();
  },
});
