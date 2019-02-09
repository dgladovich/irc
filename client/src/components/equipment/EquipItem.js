import template from './templates/equipitem.jst';
import { View } from 'backbone.marionette';

export default View.extend({
    template: template,
    className: 'equip',
    initialize: function() {
/*        let name = this.model.get('devices')[0].name.trim().split(" "),
            subName = name.pop(),
            mainName = name.join(' ');


        this.model.set({
            subName: subName,
            mainName: mainName
        })*/
    }
});