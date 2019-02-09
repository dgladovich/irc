import template from './templates/chartdatepicker.jst';
import {View, Model} from 'backbone.marionette';
import moment from 'moment';
import faker from 'faker';
import datepickerFactory from 'jquery-datepicker';
import datepickerJAFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';
import 'jquery-ui/themes/base/datepicker.css';
import 'jquery-ui/themes/base/core.css';
import 'jquery-ui/themes/base/theme.css';
datepickerFactory(jQuery);
datepickerJAFactory(jQuery);
const dateFormat = 'YYYY-MM-DD';

const DatePickerModel = Backbone.Model.extend({
    defaults: {
        dateFrom: moment().format(dateFormat),
        dateTo: moment().format(dateFormat)
    }
});

export default View.extend({
    template: template,
    className: 'chart-datepicker',

    onDestroy: function () {},
    onRender: function () {
        let id = this.model.get('id');
        let dateFrom = this.datePickerModel.get('dateFrom');
        let dateTo = this.datePickerModel.get('dateTo');
        let from = this.$(`#from_${id}`);
        let to = this.$(`#to_${id}`);

        from.val(dateFrom);
        to.val(dateTo);
/*
        from.datepicker({
            defaultDate: dateFrom,
            changeMonth: true,
        }).on('change', ());*/
        to.datepicker({
            defaultDate: dateTo,
            changeMonth: true,
        });
    },
    getDateRange: function(){
      return this.DATE_FROM;
    },
    initialize: function () {
        this.datePickerModel = new DatePickerModel();
    }
});