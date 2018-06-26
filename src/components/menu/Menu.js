import { View, Model } from 'backbone.marionette';
import template from './templates/menu.jst';

export default View.extend({
    template: template,
    onRender: function() {
        this.updateStatus();
    },
    setHeight: function() {
        this.$el.css({
            height: ($(window).height() - 60 - this.$el.offset().top) + 'px'
        });
        this.trigger('setheight');
    },
    render: function() {

        this.$el.html(this.template());
        // Get rid of that pesky wrapping-div.
        // Assumes 1 child element present in template.
        this.$el = this.$el.children();
        // Unwrap the element to prevent infinitely 
        // nesting elements during re-render.
        this.$el.unwrap();
        this.setElement(this.$el);
        this.$el.hide();
        this._bindEvents();
        this.$('#home-buttons')[0].addEventListener('load', this.setHeight.bind(this), true);
        this.safariDetect();
        this.trigger('rendered');
    },
    safariDetect: function() {
        var userAgent = window.navigator.userAgent;

        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
            setTimeout(this.setHeight.bind(this), 10);
        } else {}
    },
    updateStatus: function() {
        let device = this.$('.hover-btn');
        let statuses = _.toArray(this.controller.get('stats'));
        let cstat = this.controller.get('stat');
        let controllerStatus = _.find(statuses, {num: cstat});
        device.removeClass(this.previousClass);
        if (controllerStatus !== undefined) {
            this.previousClass = controllerStatus.dclass;
        } else {
            this.previousClass = 'off';
            console.log('Get wrong status; Device' + this.controller.get('id') + '; Status:' + this.controller.get('stat') + '; Group:' + this.controller.get('sgrp'))
        }

        //console.log(this.previousClass)
        device.addClass(this.previousClass);
    },
    _bindEvents: function() {
        $(window).resize(this.setHeight.bind(this))
    },
    onSetHeight: function() {
        this.$el.fadeIn(800);
    },
    initialize: function() {
        this.previousClass = '';
        this.controller = app.controller;
        this.on('rendered', this.onRender.bind(this));
        this.on('setheight', this.onSetHeight.bind(this));
        this.listenTo(this.controller, 'change:stat', this.updateStatus.bind(this))
    }
});