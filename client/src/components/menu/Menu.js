import { View, Model } from 'backbone.marionette';
import template from './templates/menu.jst';

export default View.extend({
  template,
  onRender() {
    this.updateStatus();
  },
  // setHeight() {

  //   this.trigger('setheight');
  // },
  render() {
    this.$el.html(this.template());
    //this.$el.hide();
    //this._bindEvents();
    // this.$('#home-buttons')[0].addEventListener('load', this.setHeight.bind(this), true);
    // this.safariDetect();
    this.trigger('rendered');
  },
  // safariDetect() {
  //   const userAgent = window.navigator.userAgent;

  //   if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
  //     setTimeout(this.setHeight.bind(this), 10);
  //   } else {}
  // },
  updateStatus() {
    // const device = this.$('.hover-btn');
    // const statuses = _.toArray(this.controller.get('stats'));
    // const cstat = this.controller.get('stat');
    // const controllerStatus = _.find(statuses, { num: cstat });
    // device.removeClass(this.previousClass);
    // if (controllerStatus !== undefined) {
    //   this.previousClass = controllerStatus.dclass;
    // } else {
    //   this.previousClass = 'off';
    //   console.log(`Get wrong status; Device${this.controller.get('id')}; Status:${this.controller.get('stat')}; Group:${this.controller.get('sgrp')}`);
    // }

    // // console.log(this.previousClass)
    // device.addClass(this.previousClass);
  },
  // _bindEvents() {
  //   $(window).resize(this.setHeight.bind(this));
  // },
  onSetHeight() {
    this.$el.fadeIn(800);
  },
  initialize() {
    this.previousClass = '';
    this.controller = app.controller;
    this.on('rendered', this.onRender.bind(this));
    this.on('setheight', this.onSetHeight.bind(this));
    this.listenTo(this.controller, 'change:stat', this.updateStatus.bind(this));
  },
});
