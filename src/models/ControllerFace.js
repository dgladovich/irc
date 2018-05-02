import Backbone from 'backbone';
import _ from 'underscore';
import BackboneRelational from 'backbone-relational';
import DeviceModel from './Device';

let MeasureModel = Backbone.RelationalModel.extend({});

export default Backbone.RelationalModel.extend({
/*	relations: [
		{
			type: Backbone.HasOne,
			key: 'dev',
			relatedModel: DeviceModel,
		}
	],
	initialize: function(){}*/
});
