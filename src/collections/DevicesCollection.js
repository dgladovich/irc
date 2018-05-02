import Device from '../models/Device';
import store from 'store';

export default Backbone.Collection.extend({
    model: Device,
    initialize: function() {
        this.on('update', ()=>{
            this.each((device, index) => {
                let defaultWidth = 120,
                    defaultCount = 12,
                    devicesCount = this.length,
                    devicesWidth = defaultCount / devicesCount * defaultWidth * 1.2;

                device.set({
                    devicesize: devicesWidth
                })
            })
        });
        this.on('sync', () => {
            this.each((device, index) => {
                let defaultWidth = 120,
                    defaultCount = 12,
                    devicesCount = this.length,
                    devicesWidth = defaultCount / devicesCount * defaultWidth * 1.2;

                device.set({
                    devicesize: devicesWidth
                })
            })
        })
    }
});