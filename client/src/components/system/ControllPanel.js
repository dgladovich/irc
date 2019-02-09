import slider from 'webpack-jquery-ui/slider';
import 'jquery-ui-touch-punch';
import Radio from 'backbone.radio';
import Noty from 'noty';
import { View, Model, CollectionView } from 'backbone.marionette';
import GodMode from './GodMode';
import device_template from './templates/device_template.jst';
import template from './templates/system.jst';

const info_speed_changed = 'info_speed_changed'; const info_speed_change = 'info_speed_change'; const
  info_speed_change_confirm = 'info_speed_change_confirm';
const ch = Radio.channel('controll');

const ControllPanelModel = Backbone.Model.extend({
  initialize() {
    this.on('change', (e) => {
      console.log(e);
    });
  },
});


const DeviceItem = View.extend({
  template: device_template,
  ui: {
    repair: '#repair',
    outrepair: '#outrepair',

  },
  events: {
    'click @ui.repair': 'setToRepair',
    'click @ui.outrepair': 'setOutRepair',
  },
  setToRepair() {
    ch.trigger('command:repair:in', {
      id: this.model.get('id'),
    });
  },
  setOutRepair() {
    ch.trigger('command:repair:out', {
      id: this.model.get('id'),
    });
  },
  updateStatus() {
    const stat = this.$('.status');
    const statName = this.$('.status-name');
    const btnRepair = this.$('#repair');
    const btnOutRepair = this.$('#outrepair');
    if (_.isNull(this.model.get('sgrp'))) return;
    const status = app.statuses.findWhere({ id: this.model.get('sgrp') }).get('sgrps_opts').findWhere({ num: this.model.get('stat') });

    stat.removeClass(this.previousClass);
    btnRepair.removeClass(this.previousBtn);
    if (this.model.get('stat') === 4) {
      btnRepair.prop('disabled', true);
      btnRepair.addClass('active');
      btnOutRepair.prop('disabled', false);
      btnOutRepair.removeClass('off');
    } else if (this.model.get('stat') === 9) {
      this.previousBtn = 'off'; 'Управление системой';
      btnRepair.prop('disabled', true);
      btnRepair.addClass(this.previousBtn);
      btnOutRepair.prop('disabled', true);
      btnOutRepair.addClass(this.previousBtn);
    } else if (this.model.get('stat') === 5) {
      this.previousBtn = 'off';
      btnRepair.prop('disabled', true);
      btnRepair.addClass(this.previousBtn);
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
  onRender() {
    // Get rid of that pesky wrapping-div.
    // Assumes 1 child element present in template.
    this.$el = this.$el.children();
    // Unwrap the element to prevent infinitely
    // nesting elements during re-render.
    this.$el.unwrap();
    this.setElement(this.$el);
    this.updateStatus();
  },
  initialize() {
    if (this.model.get('repairable') === 0) {
      this.destroy();
    }
    this.previousClass = '';
    this.previousBtn = '';
    this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this));
  },
});

const DevicesList = CollectionView.extend({
  childView: DeviceItem,
  filter(child) {
    return !!child.get('active');
  },
  className: 'gruppa row',
});


export default View.extend({
  template,
  regions: {
    devices: {
      el: '.row.gruppa',
      replaceElement: true,
    },
    'work-type': '#work-type',
    godMode: '#god-mode',
  },
  ui: {
    remote: '#remote',
    local: '#local',
    slider: '#slider',
    stop: '.btn-stop',
    start: '.btn-start',

  },
  events: {
    'click @ui.remote': 'preventShit',
    'click @ui.local': 'preventShit',
    'click @ui.stop': 'stopDevice',
    'click @ui.start': 'startDevice',
  },
  preventShit(e) {
    e.preventDefault();
  },
  startDevice() {
    ch.trigger('command:start');
    console.log('starting controller');
  },
  stopDevice() {
    ch.trigger('command:stop');
    console.log('stop controller');
  },
  changeSpeed() {
    ch.trigger('command:speed', this.previousSpeed);
  },
  updateMode() {
    const mode = this.controller.get('mode');
    let translate = '';
    const controllerMode = app.modes.findWhere({ id: mode });
    if (controllerMode) {
      const name = controllerMode.get('name');
      translate = app.language[name];
    } else {
      translate = 'there is no translate';
    }
    this.$('#work-type').html(translate);
  },
  updateSpeed() {
    const speed = app.controller.get('speed');
    this.getUI('slider').slider({ value: speed });
    this.$('.ui-slider-handle').html(speed);
    this.$('.ui-slider-range').width(`${100 * speed / 120}%`);
    new Noty({
      text: `${app.language[info_speed_changed] || info_speed_changed}: ${speed}`,
      theme: 'metroui',
      type: 'error',
      layout: 'topCenter',
      killer: true,
      timeout: 3000,
      progressBar: false,
    }).show();
  },
  updateStatus() {
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
        } */
    return this;
  },
  onRender() {
    this.model = app.devices.findWhere({ parent: null });
    this.controller = app.controller;
    this.showChildView('devices', new DevicesList({
      collection: app.devices,
    }));
    this.showChildView('godMode', new GodMode());
    this.getUI('slider').slider({
      min: 0,
      max: 120,
      animate: 'slow',
      slide: (e, ui) => {
        this.$('.ui-slider-handle').html(ui.value);
        this.$('.ui-slider-range').width(`${100 * ui.value / 120}%`);
      },
      start: (e, ui) => {
        this.previousSpeed = ui.value;
      },
      stop: (e, ui) => {
        const confirmation = confirm(`${app.language[info_speed_change_confirm] || info_speed_change_confirm}${ui.value}`);
        if (!confirmation) {
          this.getUI('slider').slider({
            value: this.previousSpeed,
          });
          this.$('.ui-slider-handle').html(this.previousSpeed);
          this.$('.ui-slider-range').width(`${100 * this.previousSpeed / 120}%`);
        } else {
          this.previousSpeed = ui.value;
          this.changeSpeed();
          this.model.set({
            speed: ui.value,
          });
        }
      },
    });
    this.updateStatus();
    this.updateMode();

    this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this));
    this.listenTo(this.controller, 'change:mode', this.updateMode.bind(this));
    this.listenTo(this.controller, 'change:speed', this.updateSpeed.bind(this));
  },
});
