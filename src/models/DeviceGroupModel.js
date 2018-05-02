import Backbone from 'backbone';
import _ from 'underscore';
import BackboneRelational from 'backbone-relational';
import Device from './Device';

export default Backbone.RelationalModel.extend({
/*    relations: [{
        type: Backbone.HasMany,
        key: 'devices',
        relatedModel: Device,
        reverseRelation: {
            type: Backbone.HasOne,
            key: 'group'
        }
    }],
    initialize: function() {
        if (this.get('devices').length > 0) {
            this.set({
                y: this.get('y'),
                x: this.get('x'),
                typ: this.get('devices').models[0].get('typ'),
                sgrp: this.get('devices').models[0].get('sgrp'),
            });
        } else {
            this.set({
                y: this.get('y'),
                x: this.get('x'),
                devices: new Backbone.Collection({devicesize:0}),
                typ: 0,
            });
        }
    }*/
});