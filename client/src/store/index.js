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
import UsersCollection from './collections/Users';
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
      statuses,
      users,
      viewgroups,
    } = config;
    this.set({
      alarms: new Alarms(alarms),
      analitics: new Analitics(),
      brokes: new Brokes(),
      cameras: new Cameras(cameras),
      controllers: new Controllers(controllers),
      controller: new Controller(controller),
      deviceGroups: new DeviceGroups(devicegroups),
      devices: new Devices(devices),
      errors: new Errors(errors),
      faces: new Faces(faces),
      informers: new Informers(informers),
      journals: new Journals(journals),
      modes: new Modes(modes),
      services: new Services(),
      pickingList: new PickingList(pickinglist),
      devicepassport: new DevicePassport(devicepassport),
      statuses: new Statuses(statuses),
      statusesStructures: new StatusesStructures(),
      viewGroups: new ViewGroups(viewgroups),
      user: new UserCredentials(),
      users: new UsersCollection(users),
    });
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
      console.error('data is not valid');
      console.log(validateConfig.validate.errors);
    }
  },
});
