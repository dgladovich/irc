import Backbone from 'backbone';

export default Backbone.Model.extend({
    initialize: function(){
        this.on('change:stat', ()=>{        })
    }
});