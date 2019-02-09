import { View } from 'backbone.marionette';
import template from './templates/equipitem.jst';

export default View.extend({
  template,
  className: 'equip',
  initialize() {
    /*        let name = this.model.get('devices')[0].name.trim().split(" "),
            subName = name.pop(),
            mainName = name.join(' ');


        this.model.set({
            subName: subName,
            mainName: mainName
        }) */
  },
});
