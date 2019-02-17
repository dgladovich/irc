import { Model } from 'backbone';
import axios from 'axios';
import Ajv from 'ajv';
import store from 'store';
import { CONFIG_URL, BASE_URL } from '../constants';
import { configSchema } from './schemas';
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
import Informers from './collections/Informers';
import Journals from './collections/Journals';
import Modes from './collections/Modes';
import Services from './collections/Services';
import Statuses from './collections/Statuses';
import StatusesStructures from './collections/StatusesStructures';
import ViewGroups from './collections/ViewGroups';
import PickingList from './collections/PickingList';
import UserCredentials from './models/UserCredentials';
import Controller from './models/Controller';
import DevicePassport from './models/DevicePassport';

const ajv = new Ajv({ allErrors: true });

window.store = store;
export default Model.extend({
  _fetchConfig() {
    return store.get('config') || axios.get(`${BASE_URL}${CONFIG_URL}`);
  },
  _fetchAlarms() { },
  _fetchServices() { },
  _fetchUserCredentials() { },
  _validateData(schema, data) {
    const validate = ajv.compile(schema);
    return {
      isValid: validate(data),
      validate,
    };
  },
  _preprocessData(data) {
    return preprocessData(data);
  },
  _initConnections() { },
  _checkCacheConsistance(lastUpdate) { return true; },
  _persistStore(data) {
    store.set('config', data);
  },
  _initCollections(config) {
    const {
      alarms,
      brokes,
      cameras,
      controller,
      controllers,
      devicegroups,
      devices,
      errors,
      faces,
      informers,
      journals,
      modes,
      pickinglist,
      devicepassport,
      services,
      statuses,
      users,
      viewgroups,
    } = config;
    this.alarms = new Alarms(alarms);
    //this.analitics = new Analitics(analitics);
    //this.brokes = new Brokes(brokes);
    this.cameras = new Cameras(cameras);
    this.controllers = new Controllers(controllers);
    this.controller = new Controller(controller);
    this.deviceGroups = new DeviceGroups(devicegroups);
    this.devices = new Devices(devices);
    this.errors = new Errors(errors);
    this.faces = new Faces(faces);
    this.informers = new Informers(informers);
    this.journals = new Journals(journals);
    this.modes = new Modes(modes);
    //this.services = new Services();
    this.pickingList = new PickingList(pickinglist);
    this.devicepassport = new DevicePassport(devicepassport);
    this.statuses = new Statuses(statuses);
    //this.statusesStructures = new StatusesStructures();
    this.viewGroups = new ViewGroups(viewgroups);
    //this.user = new UserCredentials();
  },

  async initialize() {
    let fetchedData;
    let processedData;
    const cachedConfig = store.get('config');
    if (cachedConfig) {
      const isCacheConsistance = await this._checkCacheConsistance(cachedConfig.lastUpdate);
      if (isCacheConsistance) {
        fetchedData = cachedConfig;
      } else {
        try {
          fetchedData = await this._fetchConfig();
        } catch (e) {
          console.error('Error while fetch config');
        }
        this._validateData(fetchedData.data);
        processedData = this._preprocessData(fetchedData);
        this._persistStore({ lastUpdate: fetchedData.lastUpdate, data: processedData });
      }
    }
    const validateConfig = this._validateData(configSchema, fetchedData.data);
    if (validateConfig.isValid) {
      processedData = this._preprocessData(fetchedData.data);// this too
      this._initCollections(processedData);
      await this._initConnections();
    } else {
      console.log('data is not valid');
      console.log(validateConfig.validate.errors);
    }
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
