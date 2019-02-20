import Radio from 'backbone.radio';
import StatusesCollection from './store/collections/Statuses';
import DeviceGroupCollection from './store/collections/DeviceGroups';
import ErrorsCollection from './store/collections/Errors';
import InformerCollection from './store/collections/Informers';
import Controller from './store/models/Controller';


const statusesCollection = new StatusesCollection();
const devicesGroups = new DeviceGroupCollection();
const errors = new ErrorsCollection();
const infos = new InformerCollection();
const controller = new Controller();

const collectionToFetch = [
  statusesCollection,
  devicesGroups,
  errors,
  controller,
  infos,
];

const status = Radio.channel('controll');
const network = Radio.channel('network');
const individual = Radio.channel('individual');
const alarm = Radio.channel('confirm');
const bot = Radio.channel('bot');

export function computeDeviceSize(devLength) {
  const defaultWidth = 120;
  const defaultCount = 12;
  const devicesCount = devLength;
  const devicesWidth = defaultCount / devicesCount * defaultWidth * 1.2;
  return devicesWidth;
}
export function loadInitialData(x) {
  return Promise.all(collectionToFetch.map(collection => collection.fetch().then(() => collection)));
}

export function loadJSONData(data) {
  const urls = ['/config', 'config/locale'];
  return Promise.all(urls.map(url => $.get(url)));
}
export function preparePickList(obj) {
  const arr = _.toArray(obj);
  return arr;
}

export function prepareViewGroups(groups, faces) {
  return _.filter(_.toArray(groups), (group) => {
    group.faces = new Backbone.Collection(faces.where({ viewgrp: group.id }));
    group.translate = t(group.name);

    if (group.faces.length === 0) {
      return false;
    }
    return true;
  });
}

export function prepareFaces(devices) {
  let faces = [];
  devices.each((device) => {
    const deviceFaces = _.toArray(device.get('dfaces'));
    _.each(deviceFaces, (face) => {
      const key = app.measurments.findWhere({ id: face.meas });
      if (key) {
        face.translate = t(key.get('name'));
      } else {
        face.translate = 'no name for meas';
      }
    });
    faces = faces.concat(deviceFaces);
  });
  return faces;
}

export function prepareStatuses(statuses) {
  return _.each(_.toArray(statuses), (status) => {
    status.sgrps_opts = _.each(_.toArray(status.sgrps_opts), (opt) => {
      opt.translate = t(opt.name);
    });
  });
}

export function setWrapHeight(el) {
  if ($(el).length) {
    return $(el).height($(window).height() - $(el).offset().top - 40);
  }
}

export function hidePreloader() {
  $('.loader').fadeOut('slow', () => {
    $('.loader').remove();
    $('#loader-style').remove();
  });
}

export function setWrapHeightN(el) {
  if ($(el).length) {
    return $(el).height($(window).height() - $(el).offset().top - 140);
  }
}
