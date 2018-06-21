import StatusesCollection from './collections/StatusesCollection';
import DeviceGroupCollection from './collections/DeviceGroupCollection';
import ErrorsCollection from './collections/ErrorsCollection';
import InformerCollection from './collections/InformerCollection';
import Controller from './models/Controller';
import Radio from 'backbone.radio';
import io from 'socket.io-client';
import Noty from 'noty';


const statusesCollection = new StatusesCollection;
const devicesGroups = new DeviceGroupCollection;
const errors = new ErrorsCollection;
const infos = new InformerCollection;
const controller = new Controller;

let collectionToFetch = [
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

export function computeDeviceSize(devLength){
    let defaultWidth = 120,
        defaultCount = 12,
        devicesCount = devLength,
        devicesWidth = defaultCount / devicesCount * defaultWidth * 1.2;
    return devicesWidth;
}
export function loadInitialData(x) {
    return Promise.all(collectionToFetch.map((collection) => {
        return collection.fetch().then(() => {
            return collection;
        });
    }))
}

export function loadJSONData(data) {
    let urls = ['/config', 'config/locale'];
    return Promise.all(urls.map(url => {
        return $.get(url);
    }));

}
export function preparePickList(obj) {
    let arr = _.toArray(obj);
    return arr
}

export function prepareViewGroups(groups, faces) {
    return _.filter(_.toArray(groups), (group) => {
        group.faces = new Backbone.Collection(faces.where({viewgrp: group.id}));
        group.translate = app.language[group.name] || group.name;

        if (group.faces.length === 0) {
            return false;
        } else {
            return true;
        }

    })
}

export function prepareFaces(devices) {
    let faces = [];
    devices.each((device) => {
        let deviceFaces = _.toArray(device.get('dfaces'));
        _.each(deviceFaces, (face) => {
            let key = app.measurments.findWhere({id: face.meas});
            if (key) {
                face.translate = app.language[key.get('name')];
            } else {
                face.translate = 'no name for meas'
            }
        });
        faces = faces.concat(deviceFaces);
    });
    return faces;
}

export function prepareStatuses(statuses) {
    return _.each(_.toArray(statuses), (status) => {
        status.sgrps_opts = _.each(_.toArray(status.sgrps_opts), (opt) => {
            opt.translate = app.language[opt.name] || opt.name
        })

    })
}

export function setWrapHeight(el) {
    if ($(el).length) {
        return $(el).height($(window).height() - $(el).offset().top - 40);
    }
    ;
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
    ;
}

