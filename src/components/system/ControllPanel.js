import template from './templates/system.jst';
import device_template from './templates/device_template.jst';
import slider from 'webpack-jquery-ui/slider';
import GodMode from './GodMode';
import 'jquery-ui-touch-punch';
import Radio from 'backbone.radio';
import Noty from 'noty';
import { View, Model, CollectionView } from 'backbone.marionette';


const ch = Radio.channel('controller');
let channel = Radio.channel('controll');

const ControllPanelModel = Backbone.Model.extend({
    initialize: function() {
        this.on('change', (e) => {
            console.log(e);
        })
    }
})


const DeviceItem = View.extend({
    template: device_template,
    ui: {
        'repair': '#repair',
        'outrepair': '#outrepair',

    },
    events: {
        'click @ui.repair': 'sendStatus0',
        'click @ui.outrepair': 'sendStatus1',
    },
    sendStatus0: function() {
        let stat = '_repair'
        if (this.model.get('stat') === 4) {
            stat = '_out_repair';
        } else {
            stat = '_repair';
        }
        channel.trigger('send:status', {
            cmd: stat,
            val: 0,
            ctrl: this.model.get('ctrl'),
            dev: this.model.get('lid')
        })
    },    
    sendStatus1: function() {
        let stat = '_repair'
        if (this.model.get('stat') === 4) {
            stat = '_out_repair';
        } else {
            stat = '_repair';
        }
        channel.trigger('send:status', {
            cmd: stat,
            val: 1,
            ctrl: this.model.get('ctrl'),
            dev: this.model.get('lid')
        })
    },
    updateStatus: function() {
        let stat = this.$('.status');
        let statName = this.$('.status-name');
        let btnRepair = this.$('#repair');
        let btnOutRepair = this.$('#outrepair');
        let status = app.statuses.findWhere({
            grp: this.model.get('sgrp'),
            num: this.model.get('stat'),
        });

        stat.removeClass(this.previousClass);
        btnRepair.removeClass(this.previousBtn);
        if (this.model.get('stat') === 4) {
            btnRepair.prop('disabled', true);
            btnRepair.addClass('active');
            btnOutRepair.prop('disabled', false);
            btnOutRepair.removeClass('off');
        } else if(this.model.get('stat') === 9){
            this.previousBtn = 'off';
            btnRepair.prop('disabled', true);
            btnRepair.addClass(this.previousBtn) ;
            btnOutRepair.prop('disabled', true);
            btnOutRepair.addClass(this.previousBtn);
        }else if(this.model.get('stat') === 5){
            this.previousBtn = 'off';
            btnRepair.prop('disabled', true);
            btnRepair.addClass(this.previousBtn) ;
            btnOutRepair.prop('disabled', false);
            btnOutRepair.removeClass(this.previousBtn);
        } else {
            btnRepair.prop('disabled', false);
            btnRepair.removeClass('active');
            btnOutRepair.prop('disabled', true);
            btnOutRepair.removeClass('active');
            btnOutRepair.addClass('off');
        }
        if (status) {
            this.previousClass = status.get('dclass');
            stat.addClass(this.previousClass);
            statName.html(status.get('trans'));
        } else {
            this.previousClass = 'off';
            stat.addClass(this.previousClass);
            statName.html('Неверный статус');
        }
        return this;
    },
    onRender: function() {
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        this.updateStatus()


    },
    initialize: function() {
        if(this.model.get('repairable') === 0){
            this.destroy();
        }
        this.previousClass = '';
        this.previousBtn = '';
        this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this));
    }
})

const DevicesList = CollectionView.extend({
    childView: DeviceItem,
    className: 'gruppa row'
});


export default View.extend({
    template: template,
    regions: {
        'devices': {
            el: '.row.gruppa',
            replaceElement: true
        },
        'work-type': '#work-type',
        'godMode': '#god-mode'
    },
    ui: {
        'remote': '#remote',
        'local': '#local',
        'slider': '#slider',
        'stop': '.btn-stop',
        'start': '.btn-start',

    },
    events: {
        'click @ui.remote': 'preventShit',
        'click @ui.local': 'preventShit',
        'click @ui.stop': 'stopDevice',
        'click @ui.start': 'startDevice',
    },
    preventShit: function(e) {
        e.preventDefault();
    },
    startDevice: function() {
        channel.trigger('send:status', {
            ctrl: this.model.get('ctrl'),
            dev: this.model.get('lid'),
            cmd: '_start',
        })
    },
    stopDevice: function() {
        channel.trigger('send:status', {
            ctrl: this.model.get('ctrl'),
            dev: this.model.get('lid'),
            cmd: '_stop',
        })
    },
    changeSpeed: function() {
        channel.trigger('send:status', {
            ctrl: this.model.get('ctrl'),
            cmd: '_speed',
            val: this.previousSpeed
        });
        ch.trigger('controller', {
            action: 'speed',
            arguments: {
                speed: this.previousSpeed
            }
        })
    },
    updateMode: function(){
        let mode = this.controller.get('mode');
        let translate = '';
        let controllerMode = app.modes.findWhere({ id: mode});
        if(controllerMode){
            let name = controllerMode.get('name');
            translate = app.language[name];

        } else {
            translate = 'there is no translate'
        }
        this.$('#work-type').html(translate);

    },
    updateSpeed: function(){
        let speed = app.controller.get('speed');
        this.getUI('slider').slider({value: speed});
        this.$('.ui-slider-handle').html(speed);
        this.$('.ui-slider-range').width(100 * speed / 120 + '%');
        new Noty({
            text: `Скорость изменена до значения: ${speed}`,
            theme: 'metroui',
            type: 'error',
            layout: 'topCenter',
            killer: true,
            timeout: 3000,
            progressBar: false
        }).show();
    },
    updateStatus: function() {
/*        if (this.model.get('stat') === 4) {
            this.getUI('remote').prop('checked', false);
            this.getUI('local').prop('checked', true);
            this.getUI('slider').slider('enable');
            this.getUI('slider').removeClass('passive');
            this.getUI('start').prop('disabled', true);
            this.$('#work-type').html('<div class="col-xs-6" style="padding-top: 10px; padding-right: 38px;">Режим работы:</div><div class="col-xs-6"><h4>Местный</h4></div>');
        } else if (this.model.get('stat') === 9) {
            this.getUI('slider').slider('disable');
            this.getUI('slider').addClass('passive');
            this.getUI('start').prop('disabled', true);
            this.getUI('stop').prop('disabled', true);

            this.$('#work-type').html('<div class="col-xs-6" style="padding-top: 10px; padding-right: 38px;">Режим работы:</div><div class="col-xs-6"><h4>Дистанционный</h4></div>');
        } else if (this.model.get('stat') === 6) {
            this.$('#work-type').html('<div class="col-xs-6" style="padding-top: 10px; padding-right: 38px;">Режим работы:</div><div class="col-xs-6"><h4>Выключен</h4></div>');
        } else {
            this.$('#work-type').html('<div class="col-xs-6" style="padding-top: 10px; padding-right: 38px;">Режим работы:</div><div class="col-xs-6"><h4>Дистанционный</h4></div>');
            this.getUI('remote').prop('checked', true);
            this.getUI('local').prop('checked', false);
            this.getUI('slider').slider({
                disabled: true
            });
            this.getUI('slider').addClass('passive');
            this.getUI('start').prop('disabled', false);
            this.getUI('stop').prop('disabled', false);
        }*/
        return this;
    },
    onRender: function() {
        this.model = app.devices.findWhere({ parent: null });
        this.controller = app.controller;
        this.showChildView('devices', new DevicesList({
            collection: app.devices,
        }));
        this.showChildView('godMode', new GodMode);
        this.getUI('slider').slider({
            min: 0,
            max: 120,
            animate: 'slow',
            slide: (e, ui) => {
                this.$('.ui-slider-handle').html(ui.value);
                this.$('.ui-slider-range').width(100 * ui.value / 120 + '%');
            },
            start: (e, ui) => {
                this.previousSpeed = ui.value;
            },
            stop: (e, ui) => {
                let confirmation = confirm('Вы уверены что хотите изменить скорость на ' + ui.value);
                if (!confirmation) {
                    this.getUI('slider').slider({
                        value: this.previousSpeed
                    })
                    this.$('.ui-slider-handle').html(this.previousSpeed);
                    this.$('.ui-slider-range').width(100 * this.previousSpeed / 120 + '%');
                } else {
                    this.previousSpeed = ui.value;
                    this.changeSpeed()
                    this.model.set({
                        speed: ui.value
                    })
                }
            }
        });
        this.updateStatus();
        this.updateMode();

        this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this));
        this.listenTo(this.controller, 'change:mode', this.updateMode.bind(this));
        this.listenTo(this.controller, 'change:speed', this.updateSpeed.bind(this));
    }
});