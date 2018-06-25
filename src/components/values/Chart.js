import template from './templates/chart.jst';
import {View, Model} from 'backbone.marionette';
import Chart from 'chart.js';
import ChartDatePicker from './ChartDatePicker';
import moment from 'moment';
import faker from 'faker';

export default View.extend({
    template: template,
    className: 'serial-chart',
    events: {
        'click .chart-date-checkbox':'toggleDate'
    },
    regions: {
      datepicker: {
          el: '.datepicker-field'
      }
    },
    onDestroy: function(){
        clearInterval(this.updatingChart);
    },
    updateChart: function () {
        let {labels, datasets} = this.chart.data;

        /* let R_END = this.store.length + this.OFFSET;
         let R_START = this.store.length <= this.TICKS_TO_SHOW ? 0 : R_END - this.TICKS_TO_SHOW + this.OFFSET;*/
        let R_OFFSET = Math.round(this.OFFSET);
        let R_START = R_OFFSET;
        let R_END = this.TICKS_TO_SHOW + R_OFFSET;

        let shown = this.store.slice(R_START, R_END);
        if (this.model.get('id') === 34) {
            //console.log(this.store[R_START], shown, R_START, R_END);
        }

        datasets.forEach((set) => {
            set.data = shown;
        });

        this.chart.update();
    },
    toggleDate: function(e){
        this.isSelectedDate = ! this.isSelectedDate;
        if(this.isSelectedDate){
            this.datePicker = new ChartDatePicker({model: this.model});
            this.datePicker.on('change:date', this._onChangeDate.bind(this));
            this.showChildView('datepicker', this.datePicker)
        } else {
            this.datePicker.destroy();
        }
    },
    setDate: function(){},
    updateStore: function () {
        if (this.store.length < this.TICKS_TO_STORE) {
            this.store.unshift(this.model.get('def'))
        }
        else {
            this.store.unshift(this.model.get('def'));
            this.store.pop();
        }
    },
    _onChangeDate: function(){

    },
    _completeUpdate: function () {
        this.updateStore.call(this);
        this.updateChart.call(this);
    },

    onPanLeft: function (e) {
        if(!(this.OFFSET > this.store.length + 1)){
            this.OFFSET = this.OFFSET + (e.velocityX * (-1));
            this.updateChart.call(this)
        }
    },
    onScroll: function(e){
        console.log(e)
    },
    onPanRight: function (e) {
        this.OFFSET = Math.round(this.OFFSET) <= 0 ? 0 : this.OFFSET - e.velocityX;
        this.updateChart.call(this)
    },
    _bindTouchEvents: function () {
        let mc = new Hammer(this.el);
        mc.on("panleft", this.onPanLeft.bind(this));
        mc.on("panright", this.onPanRight.bind(this));
        this.$('canvas').scroll(()=>{
            console.log('this shit scrolling')
        });
    },
    onRender: function () {
        let ctx = this.$('.canvas-chart')[0].getContext('2d');
        console.log(this.model)
        let labelText = this.model.get('translate');
        let labels = [];
        labels.length = this.LABELS;
        labels.fill('');
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: labelText,
                    data: [],
                    backgroundColor: [
                        'rgba(225,44,13,0)'
                    ],
                    borderColor: [
                        faker.commerce.color(),
                        //'rgba(225,44,13,1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: true,
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: true,
                animation: false,
                legend: false,
                elements: { point: { radius: 0 } }
            }
        });

        this.updatingChart = setInterval(this._completeUpdate.bind(this), 1000);
        this._bindTouchEvents.call(this);
    },
    initialize: function () {
        this.store = [];
        this.MAX_SHOW = 400;
        this.MIN_SHOW = 30
        this.TICKS_TO_STORE = 500;
        this.TICKS_TO_SHOW = 30;
        this.OFFSET = 0;
        this.LABELS = this.TICKS_TO_SHOW + parseInt(((10 / 100) * this.TICKS_TO_SHOW));
        this.listenTo(this.model, 'change:def', this._completeUpdate.bind(this))
    }
});