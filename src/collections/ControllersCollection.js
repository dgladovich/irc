import Controller from '../models/Controller';

export default Backbone.Collection.extend({
    model: Controller,
    url: '/controllers'

});
