'use strict';
//=====================================================================================================
// UTIL
//=====================================================================================================
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35,  home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
} 

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

function clock() { // We create a new Date object and assign it to a variable called "time".
    var time = new Date(),
        d = moment().format('DD.MM.YYYY'),
        day = time.getDay(),
        month = time.getMonth(),
        year = time.getYear(),

        // Access the "getHours" method on the Date object with the dot accessor.
        hours = time.getHours(),

        // Access the "getMinutes" method with the dot accessor.
        minutes = time.getMinutes(),


        seconds = time.getSeconds();


    document.querySelectorAll('span.clock')[0].innerHTML = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
    document.querySelectorAll('span.date')[0].innerHTML = d;

    function harold(standIn) {
        if (standIn < 10) {
            standIn = '0' + standIn
        }
        return standIn;
    }
}

function setHeiHeight() {
    if ($('.innerh100').length) {
        $('.innerh100').css({
            height: ($(window).height() - 100 - $('.innerh100').offset().top) + 'px'
        });
    }
}

function setWrapHeight() {
    if ($('.t-wrap').length) {
        $('.t-wrap').height($(window).height() - $('.t-wrap').offset().top - 100);
    };
}

function clockInit() {
    return setInterval(clock, 1000);
}



//=====================================================================================================
// Main instance of app
//=====================================================================================================

class AppView {
    constructor(selector) {

        this.user = new UserModel();
        this.backButton = $('.back-button');
        this.el = $(selector)[0];
        this.$el = $(selector);
        this.socket = io.connect('http://192.168.1.54:8889', { reconnnection: false });
        //this.socket.close();
        this.socket.on('connect_failed', function() {
            console.log("Sorry, there is connection error");
        })
        this.socket.on('reconnect_failed', function() {
            console.log("Sorry, there is connection fail!");
        })

        this.socket.on('error', function(e) {

            console.log("Sorry, there is error!", e);
        })
        this.socket.on('connect_error', function(e) {
            console.log("Sorry, there is connection error", e);
        })
        this.socket.on('data', function(data) {

            console.log('Device', data)
        })
        this.clocks = clockInit();
        this.statuses = new StatusesCollection();
        this.navBar = new NavBar({ user: this.user });
        this._bindEvents();
        this.statuses.fetch().then(() => {

            //this.devices = new Devices(this.appSnap);
            // $(document).snowfall({flakeCount : 200, maxSpeed : 2, maxSize : 3})
            this.devices = new DevicesDesignedView()
            this.devices.collection.fetch().then(() => {
                s.router = new Router();
                Backbone.history.start({ cache: false });
            })
        })

    }

    //===========================================
    // Private Methods
    //===========================================
    _bindEvents() {
        document.addEventListener('touchmove', this._preventDefault, { passive: false });
        $(window).on('resize', () => {
            $("HTML, BODY").animate({
                scrollTop: window.innerHeight - 50
            }, 250)
        })
    }
}


let UserModel = Backbone.Model.extend({
    url: 'user',
    initialize: function() {
        this.fetch();
    }
})
let DeviceModel = Backbone.Model.extend({
    url: 'devices'
})
let DevicesCollection = Backbone.Collection.extend({
    url: '/devices'
});

 
let DevicesDesignedView = Backbone.View.extend({
    el: '#obj-list',
    devicesDesigned: [],
    devicesGroups: [],
    showDeviceInfo: function(model) {
        this.modalBox.model = model;
        this.modalBox.render().$el.modal();
    },
    showGroupInfo: function(model) {
        this.modalGroupBox.model = model;
        this.modalGroupBox.render().$el.modal();
    },
    render: function() {
        let groups = new Backbone.Collection();
        this.devices = new Backbone.Collection();
        this.$('.objects').empty();
        let defaultWidth = 120,
            defaultCount = 12,
            devicesCount = this.collection.length,
            devicesWidth = defaultCount / devicesCount * defaultWidth * 1.15;
        this.collection.each((device, i) => {

            if (device.get('size') !== 0) {
                device.set('devicesize', devicesWidth);
                if (device.get('devicegroup')) {

                    if (groups.where({ groupNumber: device.get('devicegroup').id }).length === 0) {
                        groups.add({
                            groupNumber: device.get('devicegroup').id,
                            top: device.get('devicegroup').y,
                            left: device.get('devicegroup').x,
                            name: device.get('devicegroup').name,
                            typ: device.get('typ'),
                            devicesize: device.get('devicesize'),
                            devices: [device]
                        });

                    } else {

                        let devices = groups.findWhere({ groupNumber: device.get('devicegroup').id }).get('devices').push(device);


                    }
                } else {
                    this.devices.push(device);
                    this.devicesDesigned[i] = new DeviceDesigned({ model: device });
                    this.$('.objects').append(this.devicesDesigned[i].render().el);
                    if (device.get('faces').length !== 0) {
                        this.devicesDesigned[i].$el.on('click', (e) => {
                            this.showDeviceInfo(device);
                        })
                    }

                    /*                    this.devicesDesigned[i].$el.on('click', (e) => {
                                            this.showDeviceInfo(device);
                                        })*/
                }
            }

        });
        groups.each((group, i) => {

            this.devicesGroups[i] = new DevicesGroupDesigned({ model: group });

            this.$('.objects').append(this.devicesGroups[i].render().el);
            this.devicesGroups[i].$el.on('click', (e) => {
                this.showGroupInfo(group);
            })
        });
        this.trigger('render');
        return this;
    },
    initialize: function(opt) {
        this.collection = new DevicesCollection();
        this.modalBox = new DeviceModalBox({ model: new Backbone.Model });
        this.modalGroupBox = new DeviceGroupBox({ model: new Backbone.Model });
        this.listenTo(this.collection, 'sync', this.render.bind(this))
        this.once('render', () => {
            s.socket.emit('allstats', {});
        })

        s.socket.on('stats', (stats) => {
            _.each(stats, (stat) => {

                let device = this.collection.findWhere({ id: stat.dev });
                if (device !== undefined) {
                    device.set('stat', stat.stat)
                }
            })
        });

    }
});
let DeviceModalBox = Backbone.View.extend({
    el: '#deviceInfo',
    template: _.template($('script.deviceModalBoxInfo').html()),

    render: function() {
        this.$('.modal-lg').html(this.template(this.model.toJSON()));
        this.$('tbody.values-list').empty();
        if (this.model.get('faces') !== undefined) {
            _.each(this.model.get('faces'), face => {
                this.$('tbody.values-list').append(new DeviceMeasureCollapse({ model: face }).render().el);
            })
        }
        return this;
    },

});
let DeviceGroupBox = Backbone.View.extend({
    el: '#deviceInfo',
    template: _.template($('script.deviceModalBoxGroupInfo').html()),
    render: function() {
        this.$('.modal-lg').html(this.template(this.model.toJSON()));
        this.$('tbody.values-list').empty();
        _.each(this.model.get('devices'), device => {
            this.$('tbody.values-list').append(new DeviceGroupCollapse({ model: device }).render().el);
        })
        return this;
    },

});

let DeviceGroupCollapse = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('script.stat-value-template').html()),
    render: function() {
        let deviceStat = s.statuses.findWhere({ num: this.model.get('stat'), grp: this.model.get('sgrp') });
        this.model.set({ deviceStatus: deviceStat.get('trans'), statusColor: deviceStat.get('clr') });
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

});
let DeviceMeasureCollapse = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('script.measure-template').html()),
    render: function() {
        if (this.model.measure.length === 0) {
            let deviceStatus = s.statuses.findWhere({ num: this.model.def, grp: this.model.stat_grp });
            this.model.deviceValue = '';
            this.model.deviceStatus = deviceStatus.get('trans');



        } else {
            this.model.deviceStatus = '';
            this.model.deviceValue = this.model.def + this.model.measure[0].translate[0].rus;
        }
        this.$el.html(this.template(this.model));
        return this;
    },

});
let DevicesGroupDesigned = Backbone.View.extend({
    template: _.template($('script.deviceDesigned').html()),

    setStatus: function() {
        this.$('.obj-item').removeClass(this.statusClass);
        if (s.statuses.findWhere({
                grp: this.model.get('sgrp'),
                num: this.model.get('stat')
            }) !== undefined) {
            switch (s.statuses.findWhere({
                grp: this.model.get('sgrp'),
                num: this.model.get('stat')
            }).get('clr')) {
                case "#c7c7c9":
                    {
                        this.statusClass = '';
                        break;
                    }
                case "red":
                    {

                        this.statusClass = 'danger';

                        break;
                    }
                case "lime":
                case "#84bb00":
                    {
                        this.statusClass = 'active';
                        break;
                    }
                default:
                    {
                        this.statusClass = 'off';
                        break;
                    }
            }
        } else {
            humane.log('Get wrong status; Device' + this.model.get('id') + '; Status:' + this.model.get('stat') + '; Group:' + this.model.get('sgrp') + ';', { clickToClose: true })
        }


        this.$('.obj-item').addClass(this.statusClass);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        //this.initStatus();
        return this;
    },
    initialize: function(opt) {

        this.on('statusinit', () => {
            //console.log("I have initialize statuses")
            s.socket.on('d' + this.model.get('id'), (data) => {
                this.model.set({
                    stat: data
                })
            });
            this.model.on('change', (data, val) => {
                //console.log("I am changing status")
                this.setStatus();
            });
        })



    }
});
let DeviceDesigned = Backbone.View.extend({
    template: _.template($('script.deviceDesigned').html()),
    parentTemplate: _.template($('script.deviceDesignedMain').html()),

    setStatus: function() {
        this.$('.obj-item').removeClass(this.statusClass);
        if (s.statuses.findWhere({
                grp: this.model.get('sgrp'),
                num: this.model.get('stat')
            }) !== undefined) {
            switch (s.statuses.findWhere({
                grp: this.model.get('sgrp'),
                num: this.model.get('stat')
            }).get('clr')) {
                case "#c7c7c9":
                    {
                        this.statusClass = '';
                        break;
                    }
                case "red":
                    {

                        this.statusClass = 'danger';

                        break;
                    }
                case "lime":
                case "#84bb00":
                    {
                        this.statusClass = 'active';
                        break;
                    }
                default:
                    {
                        this.statusClass = 'off';
                        break;
                    }
            }
        } else {
            humane.log('Get wrong status; Device' + this.model.get('id') + '; Status:' + this.model.get('stat') + '; Group:' + this.model.get('sgrp') + ';', { clickToClose: true })
        }


        this.$('.obj-item').addClass(this.statusClass);
    },
    initStatus: function() {
        this.$('.obj-item').removeClass(this.statusClass);
        if (s.statuses.findWhere({
                grp: this.model.get('sgrp'),
                num: this.model.get('stat')
            }) !== undefined) {
            switch (s.statuses.findWhere({
                grp: this.model.get('sgrp'),
                num: this.model.get('stat')
            }).get('clr')) {
                case "#c7c7c9":
                    {
                        this.statusClass = '';
                        break;
                    }
                case "red":
                    {

                        this.statusClass = 'danger';

                        break;
                    }
                case "lime":
                case "#84bb00":
                    {
                        this.statusClass = 'active';
                        break;
                    }
                default:
                    {
                        this.statusClass = 'off';
                        break;
                    }
            }
        } else {
            humane.log('Get wrong status; Device' + this.model.get('id') + '; Status:' + this.model.get('stat') + '; Group:' + this.model.get('sgrp') + ';', { clickToClose: true })
        }


        this.$('.obj-item').addClass(this.statusClass);
        this.trigger('statusinit')
    },
    render: function() {

        if (this.model.get('parent') !== 0) {
            this.$el.html(this.template(this.model.toJSON()));
        } else {
            this.$el.html(this.parentTemplate(this.model.toJSON()));
        }
        this.initStatus();

        return this;
    },
    initialize: function(opt) {
        this.on('statusinit', () => {
            //console.log("I have initialize statuses")
            s.socket.on('d' + this.model.get('id'), (data) => {
                this.model.set({
                    stat: data
                })
            });
            this.model.on('change', (data, val) => {
                //console.log("I am changing status")
                this.setStatus();
            });
        })



    }
});


let SingletonPage = Backbone.View.extend({
    template: _.template($('script.singleton-template').html()),
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.assign({
            '.device-value-list': this.measurementsList,
        })

        return this;
    },
    initialize: function() {

        this.measurementsList = new ViewGroups();
        /*        this.measurementsList = new DeviceMeasurmentList({
                    collection: s.devices.collection
                });*/
    }
});


let ViewGroupsCollection = Backbone.Collection.extend({
    url: 'devices/viewgroups'
})

let ViewGroups = Backbone.View.extend({
    template: _.template($('script.device-measurments-template').html()),
    pillTemplate: _.template($('script.pill-template').html()),
    tabTemplate: _.template($('script.tab-template').html()),
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },

    updateStatus: function(vals) {
        _.each(s.faces, (face) => {
            let model = face.model;
            let value = _.findWhere(vals, {
                dev: model.dev,
                keyn: model.keyn
            })
            if (value !== undefined) {
                face.model.def = value.val, face.model.name;
                face.render()
            }
        })
        return this;
    },
    render: function() {
        let el = document.createElement('DIV');
        this.deviceMeasurments = [];
        s.faces = [];
        this.viewGroupCollection.each((view) => {


            if (view.toJSON().id !== undefined) {
                this.$('ul').append(this.pillTemplate(view.toJSON()));
                let tabContent = this.tabTemplate(view.toJSON());
                this.$('.device-meas-list').append($(tabContent).append());

                let faces = [];
                let groups = []

                this.devicesCollection.each(function(deviceMeasurment, i) {
                    if (deviceMeasurment.get('devicegroup')) {

                        groups.push(deviceMeasurment.get('name'))
                    } else {
                        //console.log(view.get('translate')[0].rus, deviceMeasurment.get('name'), ': ', deviceMeasurment.get('faces'))
                        if (deviceMeasurment.get('faces').length > 0) {
                            let values = deviceMeasurment.get('faces');

                            faces = faces.concat(_.where(values, { viewgrp: view.get('id') }));
                            /*                        if (_.where(values, { viewgrp: view.get('id') }).length > 0) {
                                                        //console.log('Device', deviceMeasurment.get('name'))
                                                        //console.log('deviceMeasurment:', deviceMeasurment.toJSON(), '; vals', _.where(values, { viewgrp: view.get('id') }), ';');
                                                    }*/

                            if (deviceMeasurment.get('devicegroup') > 0) {
                                console.log('there is group', this.deviceMeasurment.get('name'))
                            }


                        } else {}
                    }


                }, this);

                faces = _.sortBy(faces, 'viewtype').reverse()

                if (faces.length === 0) {
                    this.$('li>a[href$=\\#' + view.get('id') + ']').parent().remove()
                    this.$('#' + view.get('id')).remove();

                }
                faces.forEach((v, index) => {
                    this.deviceMeasurments[index] = new DeviceValueNew({ model: v });

                    s.faces.push(this.deviceMeasurments[index]);
                    this.$('#' + view.get('id')).append(this.deviceMeasurments[index].render().el)
                })

            }
        });
        if (s.devices.collection.models[0].get('ctrl') === 2) {
            let valves = s.devices.collection.where({ typ: 10 });
            let shit = new DeviceViewGroup({ collection: new Backbone.Collection(valves) }).render().el;

            this.$('#' + this.viewGroupCollection.models[0].get('id')).append(shit)
        }

        this.trigger('render');
        return this;


    },
    initialize: function() {
        this.devicesCollection = s.devices.collection;
        this.viewGroupCollection = new ViewGroupsCollection({});
        this.viewGroupCollection.fetch().then(() => {
            this.render();
        })
        this.on('render', () => {
            $(this.$('ul').children()[0]).addClass('active in');
            $(this.$('.device-meas-list').children()[0]).addClass('active in');
        })

        this.once('render', (e) => {
            s.socket.emit('allvals', {});

            s.socket.on('vals', (stats) => {
                return this.updateStatus(stats);
            });
        })

    }
});

let DeviceViewGroup = Backbone.View.extend({
    template: _.template($('script.deviceViewGroupTemplate').html()),

    render: function() {
        this.$el.html(this.template());
        this.$('.items-content').empty();
        this.collection.each((item, index) => {
            this.$('.items-content').append(new DeviceViewGroupItem({ model: item, number: ++index }).render().el);
        });

        return this;
    },
    initialize: function() {

    }
});
let DeviceViewGroupItem = Backbone.View.extend({
    template: _.template($('script.deviceValueGroupItem').html()),

    render: function() {

        this.$el.html(this.template({ index: this.index }));
        return this;
    },
    initialize: function(opt) {
        this.index = opt.number;
    }
});
let DeviceMeasurmentList = Backbone.View.extend({
    template: _.template($('script.device-measurments-template').html()),
    pillTemplate: _.template($('script.pill-template').html()),
    tabTemplate: _.template($('script.tab-template').html()),
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    render: function() {
        let el = document.createElement('DIV');
        this.deviceMeasurments = [];


        this.collection.each(function(deviceMeasurment, i) {

            if (deviceMeasurment.get('values').length > 0) {

                this.$('ul').append(this.pillTemplate(deviceMeasurment.toJSON()));
                this.deviceMeasurments[i] = new DeviceMeasurmentItem({ model: deviceMeasurment });
                let tabContent = this.tabTemplate(deviceMeasurment.toJSON());
                this.$('.device-meas-list').append($(tabContent).append(this.deviceMeasurments[i].render().el));
                this.$('ul').first().addClass('active');
                //$(el).append(this.deviceMeasurments[i].render().el);
            } else {}
        }, this);
        this.$('ul').lightSlider({
            controls: false,
            pager: false,
            item: 5,
            onAfterSlide: function() {

            }
        });

        $(this.$('ul').children()[0]).addClass('active');
        $(this.$('.device-meas-list').children()[0]).addClass('active');


        return this;


    },
    initialize: function() {}
});
let DeviceMeasurmentItem = Backbone.View.extend({
    template: _.template($('script.device-measurment-item-template').html()),
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.assign({ '.indicators-block': this.valueList })
        return this;
    },
    initialize: function() {
        this.valueList = new DeviceValues({
            collection: new Backbone.Collection(this.model.get('values'))
        })
    }
});

let DeviceValues = Backbone.View.extend({
    template: _.template($('script.device-measurments-template').html()),
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    render: function() {
        //let el = document.createElement('DIV');
        this.$el.empty();
        this.deviceValues = [];

        this.collection.each((deviceValue, i) => {
            this.deviceValues[i] = new DeviceValue({ model: deviceValue })

            //$(el).append(this.deviceValues[i].render().el);
            this.$el.append(this.deviceValues[i].render().el);
        });

        return this;


    },
    initialize: function() {}
});


let DeviceValue = Backbone.View.extend({

    linearTemplate: _.template($('script.device-measurment-linear-template').html()),
    radialTemplate: _.template($('script.device-measurment-radial-template').html()),
    statusTemplate: _.template($('script.device-measurment-status-template').html()),
    valTemplate: _.template($('script.device-measurment-val-template').html()),

    render: function() {
        if (this.model.get('statuses').length === 0) { ///All values without statuses, with some value

            if (this.model.get('measurment').length > 0) { /// Everywhere where values can be shown with progressbar
                this.$el.html(this.linearTemplate(this.model.toJSON()));
            } else {
                this.$el.html(this.valTemplate(this.model.toJSON())); ///Everywhere where values can be shown only with number
            }

        } else {
            this.$el.html(this.statusTemplate(this.model.toJSON()));
        }
        return this;
    },
    initialize: function() {}
});
let DeviceValueNew = Backbone.View.extend({
    linearTemplate: _.template($('script.device-measurment-linear-template').html()),
    radialTemplate: _.template($('script.device-measurment-radial-template').html()),
    statusTemplate: _.template($('script.device-measurment-status-template').html()),
    valTemplate: _.template($('script.device-measurment-val-template').html()),
    setStatus: function() {},
    render: function() {


        switch (this.model.viewtype) {

            case null:
            case 0:
                {
                    this.$el.html(this.statusTemplate(this.model));
                    break;
                }
            case 1:
                {
                    let model = this.model;
                    model.meas.length === 0 ? model.meas = '' : model.meas = this.model.measure[0].translate[0].rus;
                    this.$el.html(this.valTemplate(this.model));
                    break;
                }
            case 2:
                {
                    this.$el.html(this.linearTemplate(this.model));
                    break;
                }
            case 3:
                {
                    let degree = 180 / 100;
                    let model = this.model;
                    model.degree_alert = this.model.lim_alert * degree;
                    model.meas.length === 0 ? model.meas = '' : model.meas = this.model.measure[0].translate[0].rus;
                    model.def_degree = model.def * 100 / this.model.lim_max;
                    model.degree_warning = this.model.lim_warning * degree;
                    model.degree_danger = this.model.lim_danger * degree;
                    model.degree_max = this.model.lim_max * degree;
                    this.$el.html(this.radialTemplate(model));
                    break;
                }
        }
        return this;
    },
    initialize: function() {

        this.model.lim_max = this.model.lim_danger + (this.model.lim_danger * 20 / 100);
        this.model.lim_alert = this.model.lim_alert * 100 / this.model.lim_max;
        this.model.lim_warning = this.model.lim_warning * 100 / this.model.lim_max;
        s.socket.on('c' + this.model.ctrl + 'd' + this.model.dev + this.model.keyn, (data) => {
            this.model.def = data;
            if (this.model.viewtype === null || this.model.viewtype === 0) {
                //console.log("itss change", data)
                this.model.status = s.statuses.findWhere({
                    grp: this.model.stat_grp,
                    num: this.model.def
                })
                this.model.name, s.statuses.findWhere({
                    grp: this.model.stat_grp,
                }).get('trans')

                this.model.statusName = this.model.status.get('trans');
                this.model.statusColor = this.model.status.get('clr');

                switch (this.model.statusColor) {
                    case 'lime':
                        {
                            this.model.statusClass = 'active';
                            break;
                        }
                    case 'red':
                        {
                            this.model.statusClass = 'danger';
                            break
                        }
                    case '#c7c7c9':
                        {

                            this.model.statusClass = '';
                            break
                        }
                    default:
                        {
                            this.model.statusClass = 'off';
                            break
                        }
                }
            }
            this.render();
        });

        if (this.model.viewtype === null || this.model.viewtype === 0) {

            this.model.status = s.statuses.findWhere({
                grp: this.model.stat_grp,
                num: +this.model.def
            })
            this.model.statusName = this.model.status.get('trans');
            this.model.statusColor = this.model.status.get('clr');

            switch (this.model.statusColor) {
                case 'lime':
                    {
                        this.model.statusClass = 'active';
                        break;
                    }
                case 'red':
                    {
                        this.model.statusClass = 'danger';
                        break
                    }
                case '#c7c7c9':
                    {

                        this.model.statusClass = '';
                        break
                    }
                default:
                    {
                        this.model.statusClass = 'off';
                        break
                    }
            }
        }


    }
});



let IndividualPage = Backbone.View.extend({
    template: _.template($('script.individual-template').html()),
    events: {
        'click .back-top-button': 'hidePage'
    },
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    hidePage: function() {

        document.location.href = '#';

    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.assign({
            '.device-value-list': this.measurements,
        })
        return this;
    },
    initialize: function() {
        this.measurements = new MeasurementsBlock();

    }
});


let EquipmentsList = Backbone.View.extend({
    template: _.template($('script.equipment-list-template').html()),
    events: {
        'click .back-top-button': 'hidePage',
    },
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.assign({
            '.device-value-list': this.measurements,
        })
        /*        this.$("#lightSlider").lightSlider({
                    item: 3,
                    gallery: true,
                    dots: true,
                    adaptiveHeight: true,
                    controls: true
                });   */
        this.$('.owl-carousel').owlCarousel({
            margin: 10,
            nav: true,
        })
        return this;
    },
    initialize: function() {
        this.measurements = new MeasurementsBlock();

    }
});

let ServicePage = Backbone.View.extend({
    template: _.template($('script.service-template').html()),
    events: {
        'click .back-top-button': 'hidePage',
    },
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    hidePage: function() {

        document.location.href = '#';

    },
    showCalendar: function(e) {
        this.$('#calendar-works').fullCalendar('render');

    },
    showWorks: function(e) {
        this.$('#calendar-works').fullCalendar('render');

    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.calendar = this.$('#calendar').fullCalendar({
            //editable: true,
            //weekNumber: true,
            //showNonCurrentDates: false,
            //eventStartEditable: true,
            //efetchResourcesOnNavigate: true,
            //eventResourceEditable: false,
            height: 650,
            locale: 'ru',
            //defaultView: 'timelineMonth',
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            //resources: 'journal/resources',

            //events: 'journal/events',
            /*eventDrop: function(e, delta, revertFunc, jsEvent, ui, view) {
                e.transfer += delta._days;
                $('#calendar').fullCalendar('updateEvent', e);
                let data = {
                    id: e.id,
                    transfer: e.transfer
                }
                $.ajax({
                    url: 'journal/' + e.id,
                    type: 'PUT',
                    data: data,
                    datType: 'json',
                    success: (event) => {
                        $('#calendar').fullCalendar('refetchEvents');
                        humane.log("Сохранено", { timeout: 1500, clickToClose: true })
                    }
                })
            },
            eventClick: (calEvent, jsEvent, view) => {

            }*/
        });
        this.$('a[data-toggle="tab"]').on('shown.bs.tab', (e) => {
            this.calendarWorks = this.$('#calendar-works').fullCalendar({
                //editable: true,
                //weekNumber: true,
                //showNonCurrentDates: false,
                //eventStartEditable: true,
                //refetchResourcesOnNavigate: true,
                //eventResourceEditable: false,
                height: 650,
                locale: 'ru',
                //defaultView: 'month',
                schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
                //resources: 'journal/resources',

                //events: 'journal/events',
                /*                eventDrop: function(e, delta, revertFunc, jsEvent, ui, view) {
                                    e.transfer += delta._days;
                                    $('#calendar-works').fullCalendar('updateEvent', e);
                                    let data = {
                                        id: e.id,
                                        transfer: e.transfer
                                    }
                                    $.ajax({
                                        url: 'journal/' + e.id,
                                        type: 'PUT',
                                        data: data,
                                        datType: 'json',
                                        success: (event) => {
                                            $('#calendar').fullCalendar('refetchEvents');
                                            humane.log("Сохранено", { timeout: 1500, clickToClose: true })
                                        }
                                    })
                                },
                                eventClick: (calEvent, jsEvent, view) => {
                                    console.log('event clicked', calEvent)
                                }*/
            });
        })

        return this;
    },
    initialize: function() {
        this.measurements = new MeasurementsBlock();

    }
});
let SystemControll = Backbone.View.extend({
    template: _.template($('script.system-controll-template').html()),
    events: {
        'click .back-top-button': 'hidePage',
        'click .update-db': 'updateDB'
    },
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    hidePage: function() {

        document.location.href = '#';

    },
    updateDB: function() {
        humane.log('Обновление базы данных')
        this.model.fetch({ url: '/db_dump', error: () => { humane.log('База данных успешно обновлена') } });
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.calendar = this.$('#calendar').fullCalendar({
            editable: true,
            weekNumber: true,
            showNonCurrentDates: false,
            eventStartEditable: true,
            refetchResourcesOnNavigate: true,
            eventResourceEditable: false,
            height: 650,
            locale: 'ru',
            defaultView: 'timelineMonth',
            themeSystem: 'bootstrap3',
            schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
            resources: 'journal/resources',

            events: 'journal/events',
            eventDrop: function(e, delta, revertFunc, jsEvent, ui, view) {
                e.transfer += delta._days;
                $('#calendar').fullCalendar('updateEvent', e);
                let data = {
                    id: e.id,
                    transfer: e.transfer
                }
                $.ajax({
                    url: 'journal/' + e.id,
                    type: 'PUT',
                    data: data,
                    datType: 'json',
                    success: (event) => {
                        $('#calendar').fullCalendar('refetchEvents');
                        humane.log("Сохранено", { timeout: 1500, clickToClose: true })
                    }
                })
            },
            eventClick: (calEvent, jsEvent, view) => {

            }
        });
        return this;
    },
    initialize: function() {
        this.measurements = new MeasurementsBlock();

    }
});

let PassportPage = Backbone.View.extend({
    template: _.template($('script.passport-template').html()),
    passportTemplate: _.template($('script.shield-template').html()),
    pickTemplate: _.template($('script#complectRow').html()),
    events: {
        'click .back-top-button': 'hidePage',
        'click .pass-pass': 'showPass',
        'click .pass-comp': 'showComp',
        'click .pass-instr': 'showInstr',

    },
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    hidePage: function() {

        document.location.href = '#';

    },
    renderPassport: function() {
        let passportData = this.model.get('passportdata')[0];
        this.$('.passport-board').html(this.passportTemplate(passportData));
        return this;
    },
    showPass: function() {
        return this;
    },
    showComp: function() {

        let template = _.template($('script#complectRow').html());
        let pickingList = this.model.get('pickinglist')[0];
        $('#pass-c .pass-cont').empty();
        _.each(pickingList.opts, (model) => {
            this.$('#pick-list').append(template(model));
        })
        return this;
    },
    showInstr: function() {
        return this;
    },
    render: function() {
        console.log(this.model)
        this.$el.html(this.template(this.model.toJSON()));
        this.renderPassport();
        let pickingList = this.model.get('pickinglist')[0];
        $('#pass-c .pass-cont').empty();
        _.each(pickingList.opts, (model) => {
            this.$('#pick-list').append(this.pickTemplate(model));
        })
        return this;
    },
    initialize: function() {
        this.measurements = new MeasurementsBlock();

    }
});

let NavBar = Backbone.View.extend({
    el: 'header',
    events: {
        'click .messages-button': 'showMessages'
    },
    showMessages: function() {
        document.location.href = '#messages';
        return this;
    },
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    renderUser: function() {
        console.log(this.$('span.user-name').find('span').html(this.user.get('name')))
        $('.fingerprint').remove();

        $('#auth-name').html(this.user.get('name'));
    },
    render: function() {
        return this;
    },
    initialize: function(opt) {
        this.user = opt.user
        this.listenTo(this.user, 'sync', this.renderUser.bind(this))
    }
});

let MessagesPage = Backbone.View.extend({
    events: {
        'click .back-top-button': 'hidePage'
    },
    template: _.template($('script.messages-template').html()),
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    hidePage: function() {
        document.location.href = '#';
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.assign({
            '.device-value-list': this.measurements,
        })
        return this;
    },
    initialize: function() {
        this.measurements = new MeasurementsBlock();

    }
});
let JournalModel = Backbone.Model.extend({
    defaults: {
        order: 'id',
        orderDirection: 'ASC',
        start: '2017-11-01',
        end: moment().format('YYYY-MM-DD'),
        messageType: 0,
        messageCode: 0
    }
})
let JournalPage = Backbone.View.extend({
    template: _.template($('script.events-journal-template').html()),
    events: {
        'click .back-top-button': 'hidePage',
        'change #journal-from': 'selectStartDate',
        'change #journal-to': 'selectEndDate',
        'change #message-type': 'changeMessageType',
        'click .journal-number': 'orderByNumber',
        'click .journal': 'orderByClassName'


    },
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    selectStartDate: function(e) {

        this.model.set('start', $(e.target).val());

    },
    selectEndDate: function(e) {
        this.model.set('end', $(e.target).val());
    },
    changeMessageType: function(e) {
        this.model.set('messageType', +$(e.target).val());
    },
    hidePage: function() {

        document.location.href = '#';

    },
    orderByNumber: function() {
        this.model.get('orderDirection') === 'DESC' ? this.model.set('orderDirection', 'ASC') : this.model.set('orderDirection', 'DESC');
        this.collection.comparator = (a) => {
            this.historyList.orderDirection = this.model.get('orderDirection');
            let direction = this.model.get('orderDirection') === 'DESC' ? -1 : 1
            return direction * a.get('id');
        };
        this.collection.sort();

    },
    orderByClassName: function(e) {
        let orderType = $(e.target)[0].classList[3].split('-')[1]
        if (this.model.get('order') === orderType) {
            this.model.get('orderDirection') === 'DESC' ? this.model.set('orderDirection', 'ASC') : this.model.set('orderDirection', 'DESC');
        } else {
            this.model.set({
                orderDirection: 'ASC',
                order: orderType
            });
        }
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.assign({
            'tbody.events-list': this.historyList,
            'tbody.alarms-list': this.alarmsList
        })
        this.$('#journal-from').val(this.model.get('start'))
        this.$('#journal-to').val(this.model.get('end'))
        return this;
    },
    initialize: function() {

        this.collection = new HistoryCollection();
        this.alarmsCollection = new AlarmsCollection()
        this.collection.fetch();
        this.alarmsCollection.fetch();
        this.model = new JournalModel();
        this.historyList = new HistoryList({ collection: this.collection });
        this.alarmsList = new AlarmsList({ collection: this.alarmsCollection });

        this.listenTo(this.model, 'change', (model) => {
            let url = 'history/range';
            let query = this.model.toJSON();
            this.collection.fetch({
                url: url,
                data: $.param(query)
            })
        });
    }
});
let VisualPage = Backbone.View.extend({
    template: _.template($('script.visual-cameras-template').html()),
    events: {
        'click .back-top-button': 'hidePage'
    },
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.trigger('render')
        return this;
    },
    initialize: function() {}
});
let HistoryModel = Backbone.Model.extend();
var HistoryCollection = Backbone.Collection.extend({
    model: HistoryModel,
    url: function() {
        return 'history/';
    }
});
var AlarmsCollection = Backbone.Collection.extend({
    model: HistoryModel,
    url: function() {
        return 'alarms/';
    }
});
var HistoryView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#historyRow').html()),

    render: function() {
        let model = this.model.toJSON();
        model.number = this.number;
        model.date = moment(this.model.get('date')).format('YYYY-MM-DD');
        model.time = moment(this.model.get('date')).format('HH:mm:ss');
        switch (this.model.get('type')) {
            case 1:
                model.type = 'Информационный';
                break;
            case 2:
                model.type = 'Тревожный';
                break;
            case 3:
                model.type = 'Критический';
                break;
        }

        this.$el.html(this.template(model));

        return this;
    },

    initialize: function(opt) { this.number = opt.number; }
});
var HistoryList = Backbone.View.extend({
    tagName: 'tbody',
    events: {},

    render: function() {
        this.histories = [];
        this.collection.pluck('id');

        if (this.collection.length === 0) {
            this.$el.html('Событий не найдено');

        } else {
            this.$el.empty();
            this.collection.each(function(history, i) {
                this.histories[i] = new HistoryView({
                    model: history,
                    number: this.orderDirection === 'DESC' ? this.collection.length + 1 - i : i + 1
                });
                this.$el.append(this.histories[i].render().el);
            }, this);
        }

        return this;


    },

    initialize: function(opt) {
        this.orderDirection = opt.orderDirection;
        this.listenTo(this.collection, 'sync', () => {
            this.render();
        });
        this.listenTo(this.collection, 'sort', () => {
            this.render();
        });
    }
});
var AlarmsList = Backbone.View.extend({
    tagName: 'tbody',
    events: {},

    render: function() {
        this.$el.empty();

        this.alarms = [];
        //this.collection.pluck('id');

        if (this.collection.length === 0) {
            this.$el.html('Неисправностей нет')

        } else {
            this.collection.each(function(history, i) {

                this.alarms[i] = new AlarmView({
                    model: history,
                    number: this.orderDirection === 'DESC' ? this.collection.length + 1 - i : i + 1
                });


                this.$el.append(this.alarms[i].render().el);

                console.log(this.alarms[i])
            }, this);

        }

        return this;


    },

    initialize: function(opt) {
        this.orderDirection = opt.orderDirection;
        this.listenTo(this.collection, 'sync', () => {
            this.render();
        });
        this.listenTo(this.collection, 'sort', () => {
            this.render();
        });
    }
});

var AlarmView = Backbone.View.extend({
    tagName: 'tr',
    template: _.template($('#alarmRow').html()),

    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    initialize: function(opt) { this.number = opt.number; }
});

let MeasurementsBlock = Backbone.View.extend({

    render: function() {
        return this;
    },
    initialize: function() {}
});


let TOIR = Backbone.View.extend({

    render: function() {
        return this;
    },
    initialize: function() {}
});

let TOElement = Backbone.View.extend({

    render: function() {
        return this;
    },
    initialize: function() {}
});



let Chart = Backbone.View.extend({

    render: function() {
        return this;
    },
    initialize: function() {}
});
let StatusesCollection = Backbone.Collection.extend({
    url: 'statuses'
})


let DevicePage = Backbone.View.extend({
    template: _.template($('script.device-page-template').html()),
    events: {
        'click .back-top-button': 'hidePage'
    },
    assign: function(selector, view) {
        var selectors;

        if (_.isObject(selector)) {
            selectors = selector;
        } else {
            selectors = {};
            selectors[selector] = view;
        }

        if (!selectors) return;
        _.each(selectors, function(view, selector) {
            view.setElement(this.$(selector)).render();
        }, this);
    },
    hidePage: function() {

        document.location.href = '#';

    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        this.assign({
            '.device-value-list': this.measurements,
            '.device-to-list': this.toir,
            '.device-measurments-chart': this.chart
        })
        return this;
    },
    initialize: function() {
        this.measurements = new MeasurementsBlock();
        this.toir = new TOIR();
        this.chart = new Chart();
    }
});


let Router = Backbone.Router.extend({
    routes: {
        '': 'index',
        '#': 'anotherIndex',
        'current': 'showCurrentEquip',
        'values': 'showCurrentValues',
        'journal': 'showJournal',
        'passport': 'showPassport',
        'visual': 'showVisual',
        'messages': 'showMessages',
        'service': 'showService',
        'system': 'showSystem',
        'individual': 'showIndividual',
        'device/:id': 'showDevicePage',

    },
    index: function() {
        $('.page-content').empty().css({
            height: '0',
            backgroundColor: 'green',
            paddingTop: '0'
        })
    },
    showCurrentEquip: function() {
        $('.page-content').removeAttr('style');
        $('.page-content').html(new EquipmentsList({ model: new Backbone.Model }).render().el);
        $("HTML, BODY").animate({
            scrollTop: window.innerHeight - 50
        }, 250)
    },
    showCurrentValues: function() {
        $('.page-content').removeAttr('style');
        $('.page-content').html(new SingletonPage({ model: new Backbone.Model }).render().el);
        $("HTML, BODY").animate({
            scrollTop: window.innerHeight - 50
        }, 250)
    },
    showJournal: function() {
        $('.page-content').removeAttr('style');
        $('.page-content').html(new JournalPage({ model: new Backbone.Model }).render().el);
        $("HTML, BODY").animate({
            scrollTop: window.innerHeight - 50
        }, 250)
    },

    showVisual: function() {
        $('.page-content').removeAttr('style');
        $('.page-content').html(new VisualPage({ model: new Backbone.Model }).render().el);
        $("HTML, BODY").animate({
            scrollTop: window.innerHeight - 50
        }, 250)
    },
    showPassport: function() {
        $('.page-content').removeAttr('style');
        $('.page-content').html(new PassportPage({ model: s.devices.collection.findWhere({ id: 1 }) }).render().el);
        $("HTML, BODY").animate({
            scrollTop: window.innerHeight - 50
        }, 250)
    },
    showService: function() {
        $('.page-content').removeAttr('style');
        $('.page-content').html(new ServicePage({ model: new Backbone.Model }).render().el);
        $("HTML, BODY").animate({
            scrollTop: window.innerHeight - 50
        }, 250)
    },
    showMessages: function() {
        $('.page-content').removeAttr('style');
        $('.page-content').html(new MessagesPage({ model: new Backbone.Model }).render().el);
        $("HTML, BODY").animate({
            scrollTop: window.innerHeight - 50
        }, 250);
    },
    showSystem: function() {
        $('.page-content').removeAttr('style');
        $('.page-content').html(new SystemControll({ model: new Backbone.Model }).render().el);
        $("HTML, BODY").animate({
            scrollTop: window.innerHeight - 50
        }, 250);
    },
    showIndividual: function() {
        $('.page-content').removeAttr('style');
        $('.page-content').html(new IndividualPage({ model: new Backbone.Model }).render().el);
        $("HTML, BODY").animate({
            scrollTop: window.innerHeight - 50
        }, 250);
    },
    showDevicePage: function(id) {
        $('.page-content').removeAttr('style');
        if (!s.devices) {
            let device = new DeviceModel({ id: id });
            $('.page-content').html(new DevicePage({ model: device }).render().el);
            device.fetch();
        } else {

            let device = s.devices.collection.findWhere({ id: 11 });
            $('.page-content').html(new DevicePage({ model: device }).render().el);
        }
        //$('.page-content').html(new DevicePage({model: this.model}).render().el);
        $("HTML, BODY").animate({
            scrollTop: window.innerHeight - 50
        }, 250)
    }
});

let s;

//=====================================================================================================
// INIT
//=====================================================================================================
$(function() {

    s = new AppView('.svg-box');
    //console.clear();
})