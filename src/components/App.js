import Marionette from 'backbone.marionette';
import {Router} from './Router';
import {history} from 'backbone';
import {DevicesDispatcher, prepareViewGroups, prepareFaces, prepareStatuses, preparePickList, computeDeviceSize} from '../Utils';
import Controller from '../models/Controller';
import FacesCollection from '../collections/FacesCollection';
import ControllersCollection from '../collections/ControllersCollection';
import StatusesCollection from '../collections/StatusesCollection';
import ViewGroupCollection from '../collections/ViewGroupsCollection';
import AlarmsCollection from '../collections/AlarmsCollection';
import ControllerConnection from '../connections/ControllerConnection';

export default Marionette.Application.extend({
    region: '#app',
    channelName: 'user',
    onBeforeStart: function (data) {
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
    },
    onStart(app, options) {
        this.router = new Router({
            app: this,
            options: options
        });
        //this.controllerConnection = new ControllerConnection();
        history.start();
    },
    initialize: function(){}
});