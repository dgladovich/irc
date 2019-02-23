import { View, Model } from 'backbone.marionette';
import moment from 'moment';
import faker from 'faker';
import datepickerFactory from 'jquery-datepicker';
import datepickerJAFactory from 'jquery-datepicker/i18n/jquery.ui.datepicker-ru';

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
  className: 'chart-datepicker',
  onRender() {
    const id = this.model.get('id');
    const dateFrom = this.datePickerModel.get('dateFrom');
    const dateTo = this.datePickerModel.get('dateTo');
    const from = this.$(`#from_${id}`);
    const to = this.$(`#to_${id}`);

    from.val(dateFrom);
    to.val(dateTo);
    to.datepicker({
      defaultDate: dateTo,
      changeMonth: true,
    });
  },
  getDateRange() {
    return this.DATE_FROM;
  },
  template: (data) => {
    const { id } = data;
    return this.html`
    <label for="from_${id}">От</label>
    <input type="text" id="from_${id}" class="chart-datepicker" name="from">
    <label for="to_${id}">До</label>
    <input type="text" id="to_${id}" class="chart-datepicker" name="to">
    `;
  },
  initialize() {
    this.datePickerModel = new DatePickerModel();
  },
});
