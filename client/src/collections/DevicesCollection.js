import Device from '../models/Device';

export default Backbone.Collection.extend({
    model: Device,
    initialize: function(opt) {
        this.each((device, index) => {
            console.log('Collection init')

            let defaultWidth = 120,
                defaultCount = 12,
                devicesCount = this.length,
                devicesWidth = defaultCount / devicesCount * defaultWidth * 1.2;

            device.set({
                devicesize: devicesWidth
            })
        })
    }
});