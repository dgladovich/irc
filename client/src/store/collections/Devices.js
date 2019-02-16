import Device from '../models/Device';

export default Backbone.Collection.extend({
  model: Device,
  initialize(opt) {
    this.each((device, index) => {
      console.log('Collection init');

      const defaultWidth = 120;


      const defaultCount = 12;


      const devicesCount = this.length;


      const devicesWidth = defaultCount / devicesCount * defaultWidth * 1.2;

      device.set({
        devicesize: devicesWidth,
      });
    });
  },
});
