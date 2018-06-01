import filter from './templates/test.jst';
import {View, Model} from 'backbone.marionette';
import 'jquery-slimscroll';
export default View.extend({
    template: filter,

    onRender: function () {
        this.$('#about').slimScroll({width: 500})
    }

});