import { View, Model } from 'backbone.marionette';
import Chart from 'chart.js';
import moment from 'moment';
import faker from 'faker';
import ChartDatePicker from './ChartDatePicker';
import template from './templates/chart.jst';

export default View.extend({
  template,
  className: 'serial-chart',
  events: {
    'click .chart-date-checkbox': 'toggleDate',
  },
  regions: {
    datepicker: {
      el: '.datepicker-field',
    },
  },
  onDestroy() {
    clearInterval(this.updatingChart);
  },
  updateChart() {
    const { labels, datasets } = this.chart.data;

    /* let R_END = this.store.length + this.OFFSET;
         let R_START = this.store.length <= this.TICKS_TO_SHOW ? 0 : R_END - this.TICKS_TO_SHOW + this.OFFSET; */
    const R_OFFSET = Math.round(this.OFFSET);
    const R_START = R_OFFSET;
    const R_END = this.TICKS_TO_SHOW + R_OFFSET;

    const shown = this.store.slice(R_START, R_END);
    if (this.model.get('id') === 34) {
      // console.log(this.store[R_START], shown, R_START, R_END);
    }

    datasets.forEach((set) => {
      set.data = shown;
    });

    this.chart.update();
  },
  toggleDate(e) {
    this.isSelectedDate = !this.isSelectedDate;
    if (this.isSelectedDate) {
      this.datePicker = new ChartDatePicker({ model: this.model });
      this.datePicker.on('change:date', this._onChangeDate.bind(this));
      this.showChildView('datepicker', this.datePicker);
    } else {
      this.datePicker.destroy();
    }
  },
  setDate() {},
  updateStore() {
    if (this.store.length < this.TICKS_TO_STORE) {
      this.store.unshift(this.model.get('def'));
    } else {
      this.store.unshift(this.model.get('def'));
      this.store.pop();
    }
  },
  _onChangeDate() {

  },
  _completeUpdate() {
    this.updateStore.call(this);
    this.updateChart.call(this);
  },

  onPanLeft(e) {
    if (!(this.OFFSET > this.store.length + 1)) {
      this.OFFSET = this.OFFSET + (e.velocityX * (-1));
      this.updateChart.call(this);
    }
  },
  onScroll(e) {
    console.log(e);
  },
  onPanRight(e) {
    this.OFFSET = Math.round(this.OFFSET) <= 0 ? 0 : this.OFFSET - e.velocityX;
    this.updateChart.call(this);
  },
  _bindTouchEvents() {
    const mc = new Hammer(this.el);
    mc.on('panleft', this.onPanLeft.bind(this));
    mc.on('panright', this.onPanRight.bind(this));
    this.$('canvas').scroll(() => {
      console.log('this shit scrolling');
    });
  },
  onRender() {
    const ctx = this.$('.canvas-chart')[0].getContext('2d');
    console.log(this.model);
    const labelText = this.model.get('translate');
    const labels = [];
    labels.length = this.LABELS;
    labels.fill('');
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: labelText,
          data: [],
          backgroundColor: [
            'rgba(225,44,13,0)',
          ],
          borderColor: [
            faker.commerce.color(),
            // 'rgba(225,44,13,1)'
          ],
          borderWidth: 2,
        }],
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              autoSkip: true,
            },
          }],
          yAxes: [{
            ticks: {
              beginAtZero: true,
            },
          }],
        },
        responsive: true,
        maintainAspectRatio: true,
        animation: false,
        legend: false,
        elements: { point: { radius: 0 } },
      },
    });

    this.updatingChart = setInterval(this._completeUpdate.bind(this), 1000);
    this._bindTouchEvents.call(this);
  },
  initialize() {
    this.store = [];
    this.MAX_SHOW = 400;
    this.MIN_SHOW = 30;
    this.TICKS_TO_STORE = 500;
    this.TICKS_TO_SHOW = 30;
    this.OFFSET = 0;
    this.LABELS = this.TICKS_TO_SHOW + parseInt(((10 / 100) * this.TICKS_TO_SHOW));
    this.listenTo(this.model, 'change:def', this._completeUpdate.bind(this));
  },
});
