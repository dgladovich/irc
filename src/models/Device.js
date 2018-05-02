import Backbone from 'backbone';
import 'backbone-relational';

export default Backbone.RelationalModel.extend({
    initialize: function(){
        console.log('its init')
        this.on('change:stat', ()=>{
            console.log('Changing this ')
        })
    }
});