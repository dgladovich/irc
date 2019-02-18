import { View, Model } from 'backbone.marionette';
import moment from 'moment';
import faker from 'faker';
import datepickerFactory from 'jquery-datepicker';
import datepickerJAFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';
import template from './templates/chartdatepicker.jst';

datepickerFactory(jQuery);
datepickerJAFactory(jQuery);
const dateFormat = 'YYYY-MM-DD';

const DatePickerModel = Backbone.Model.extend({
  defaults: {
    dateFrom: moment().format(dateFormat),
    dateTo: moment().format(dateFormat),
  },
});

export default View.extend({
  template,
  className: 'chart-datepicker',

  onDestroy() {},
  onRender() {
    const id = this.model.get('id');
    const dateFrom = this.datePickerModel.get('dateFrom');
    const dateTo = this.datePickerModel.get('dateTo');
    const from = this.$(`#from_${id}`);
    const to = this.$(`#to_${id}`);

    from.val(dateFrom);
    to.val(dateTo);
    /*
        from.datepicker({
            defaultDate: dateFrom,
            changeMonth: true,
        }).on('change', ()); */
    to.datepicker({
      defaultDate: dateTo,
      changeMonth: true,
    });
  },
  getDateRange() {
    return this.DATE_FROM;
  },
  initialize() {
    this.datePickerModel = new DatePickerModel();
  },
});
