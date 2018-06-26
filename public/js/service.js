'use strict';
//=====================================================================================================
// UTIL
//=====================================================================================================



//=====================================================================================================
// Main instance of app
//=====================================================================================================



class AppView{
	constructor( selector ){
		this.$el = $(selector);
		this.el = this.$el[0];
		this.editor = new Editor( this.$el.find('') )
	}



//===========================================
// Private Methods
//===========================================
	_bindEvents(){

	}



}


let s;

class Editor{
	constructor( element ){

		this.view = new EditorView({ el: '#editor' })
	}

}

let EditorView = Backbone.View.extend({
	el: '#editor',
	selected: {},
	assign : function (selector, view) {
	    var selectors;

	    if (_.isObject(selector)) {
	        selectors = selector;
	    } else {
	        selectors = {};
	        selectors[selector] = view;
	    }

	    if (!selectors) return;
	    _.each(selectors, function (view, selector) {
	        view.setElement(this.$(selector)).render();
	    }, this);
	},
	render: function(){
		this.assign({
			".editor-form": this.deviceForm,
			".editor-devices-list": this.devicesList,
			".editor-field": this.devicesField
		})
		return this;
	},
	initialize: function(){
		this.collection = new DevicesCollection();

		this.collection.fetch().then(()=>{
			this.selected = this.collection.models[0].set({
				selected: true
			});


			this.deviceForm = new DeviceFormView({
				model: this.collection.models[0]
			});
			this.devicesList = new DevicesListView({
				collection: this.collection
			});
			this.devicesField = new FieldView({
				collection: this.collection
			});



			this.listenTo(this.devicesField, 'select', ( device )=>{
				this.selected.set('selected', false);
				this.selected = device.model;
				this.selected.set('selected', true);
				this.deviceForm.model = device.model;
				this.deviceForm.render();
			});
			this.listenTo(this.devicesList, 'select', ( device )=>{
				this.selected.set('selected', false);
				this.selected = device.model;
				this.selected.set('selected', true);
				this.deviceForm.model = device.model;
				this.deviceForm.render();
			});

			this.render();
		})

	}
});



let DevicesCollection = Backbone.Collection.extend({
	url: '/devices'
});
let TypesCollection = Backbone.Collection.extend({
	url: '/types'
});
let StatusesCollection = Backbone.Collection.extend({
	url: '/statuses'
});




let DeviceFormView = Backbone.View.extend({
	slider: this.$('#number-slider').bootstrapSlider({ min: 0, max: 255 }),
	events: {
		'change #photo-input': "handlePhoto"
	},
	handlePhoto: function(e){
		
		let fileData = $(e.target).prop('files')[0];
	 	let data = new FormData();
   		data.append('photo', fileData);
   		console.log(fileData)
   		
	    $.ajax({
	        url: '/photo',
	        type: 'POST',
	        data: data,
	        cache: false,
	        dataType: 'json',
	        processData: false, // Don't process the files
	        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
	        success: (data, textStatus, jqXHR)=> {	
	            if(typeof data.error === 'undefined')
	            {
	                // Success so call function to process the form
	                this.deviceType.collection.where({id: this.model.get('typ')}).set('img_src', 'upload/' + fileData.name)
	            }
	            else
	            {
	                // Handle errors here
	                console.log('ERRORS: ' + data.error);
	            }
	        },
	        error: (jqXHR, textStatus, errorThrown)=> {
	            // Handle errors here
	            console.log('ERRORS: ' + textStatus);
	            // STOP LOADING SPINNER
	        }
	    });
	   // e.preventDefault();
	},
	assign : function (selector, view) {
	    var selectors;

	    if (_.isObject(selector)) {
	        selectors = selector;
	    } else {
	        selectors = {};
	        selectors[selector] = view;
	    }

	    if (!selectors) return;
	    _.each(selectors, function (view, selector) {
	        view.setElement(this.$(selector)).render();
	    }, this);
	},
	render: function(){
		let widthPer = $('.editor-field').width() / 100;
		let heightPer = $('.editor-field').height() / 100;
		this.$('#controller-name').val( this.model.get('name') )
		this.slider.bootstrapSlider( 'setValue', +this.model.get('size') * widthPer );
		this.assign({
			'select#device-type': this.deviceType,
			'select#device-status': this.deviceStatus
		});
		this.deviceType.$el.val( this.model.get('typ') )
		this.deviceStatus.$el.val( this.model.get('stat') )


		this.slider.on('slide', (e)=>{
			this.model.set('size', e.value / widthPer );
		});		
		this.slider.on('slideStop', (e)=>{
			this.model.save({ size: e.value / widthPer });
		});
		return this;
	},
	initialize: function(){
		this.deviceType = new DeviceFormTypeView({ collection: new TypesCollection });
		this.deviceStatus = new DeviceFormStatusView({ collection: new StatusesCollection });
		
	}
});

let DeviceFormTypeView = Backbone.View.extend({
	template: _.template($('script.controller-type-template').html()),
	render: function(){
		this.collection.fetch().then(()=>{
			this.collection.each(( type, i )=>{

				this.$el.append(this.template( type.toJSON() ));
				
			});
		});

		return this;
	},
	initialize: function(){

		
	}
});

let DeviceFormStatusView = Backbone.View.extend({
	template: _.template($('script.controller-status-template').html()),
	render: function(){
		this.collection.fetch().then(()=>{
			this.collection.each(( type, i )=>{

				this.$el.append(this.template( type.toJSON() ));
				
			});
		});

		return this;
	},
	initialize: function(){

		
	}
});

let FieldView = Backbone.View.extend({
	devices: [],
	selected: {},
	events: {
		
	},
	focusSelected: function( device ){
		console.log(device)
		$( this.selected ).css({
			border: 'none'
		});
		this.selected = device.$el;
		this.selected.css({
			border: '3px solid red'
		});
	},

	render: function(){
		this.$el.empty();
		var width = this.$el.width();
		var height = this.$el.height();

		var circle = $(document.createElement('DIV')).addClass('element-to-drag');
		this.collection.fetch().then(()=>{
			this.collection.each(( device, i )=>{
				this.devices[i] = new DeviceView({ model: device, size:{ width: width, height: height } });

				this.listenTo(this.devices[i], 'select', ( device )=>{

					this.trigger('select', device);
				});
				
				this.$el.append( 
					this.devices[i]
						.render()
						.$el.draggable({ 
							containment: '.' + this.$el.attr('class'),
							stop: ()=>{
								//console.log( parseInt(this.devices[i].$el.css('top')) / ( height / 100 ), parseInt(this.devices[i].$el.css('left')) / ( width / 100 ))
								device.save({
									top: parseInt(this.devices[i].$el.css('top')) / ( height / 100 ),
									left: parseInt(this.devices[i].$el.css('left')) / ( width / 100 )
								})
							}
						 }) 
				);
			});
			return this;
		})
	},
	initialize: function(){
	}
});

let DeviceView = Backbone.View.extend({
	events: {
		'mousedown': 'suckDick'
	},
	suckDick: function(){
		return this.trigger('select', this, this.model);
	},
	assign : function (selector, view) {
	    var selectors;

	    if (_.isObject(selector)) {
	        selectors = selector;
	    } else {
	        selectors = {};
	        selectors[selector] = view;
	    }

	    if (!selectors) return;
	    _.each(selectors, function (view, selector) {
	        view.setElement(this.$(selector)).render();
	    }, this);
	},
	render: function(){
		this.$el.addClass('element-to-drag');
		this.$el.css({
			width: this.model.get('size') * this.size.width / 100,
			height: this.model.get('size') * this.size.width / 100,
			borderRadius: this.model.get('size') / 2 * this.size.width / 100,
			position: 'absolute',
			top: this.model.get('top') * this.size.height / 100,
			left: this.model.get('left') * this.size.width / 100,
		})
		return this;
	},
	initialize: function(opt){
		this.size = opt.size;
		this.listenTo(this.model, 'change:size', ()=>{
			this.render();
		});		
		this.listenTo(this.model, 'change:selected', ()=>{
			if(this.model.get('selected') === true) {
				this.$el.css({
					border: '3px solid red'
				});
			} else {
				this.$el.css({
					border: 'none'
				});
			}
		});
	}
});

let DevicesListView = Backbone.View.extend({
	devices: [],
	selected: {},
	focusSelected: function( selected ){
	},
	render: function(){
		this.$el.empty();
		this.collection.each(( device, i )=>{
			this.devices[i] = new DevicesListElemView({ model: device }).render();
			this.$el.append(this.devices[i].el)

			this.listenTo(this.devices[i], 'select', this.trigger.bind(this, 'select', this.devices[i]));
		});
		return this;
	},
	initialize: function(){}
});



let DevicesListElemView = Backbone.View.extend({
	events:{
		'click': 'selectDevice'
	},
	selectDevice: function(){
		return this.trigger('select');
	},
	template: _.template($('script.controller-list-el').html()),
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	},
	initialize: function(){
		this.listenTo(this.model, 'change:selected', ()=>{
			if(this.model.get('selected') === true) {
				this.$el.css({
					background: 'white',
					color: 'black'
				});
			} else {
				this.$el.css({
					background: 'black',
					color: 'white'
				});
			}
		})
	}
});

//=====================================================================================================
// INIT
//=====================================================================================================
$(function(){

	s = new AppView('');

})