import Backbone from 'backbone';

export default Backbone.Model.extend({
    initialize: function(){
        console.log('its init')
        this.on('change:stat', ()=>{
            console.log('Changing this ')
        })
    }
});