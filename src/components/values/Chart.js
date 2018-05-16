import template from './templates/chart.jst';
import {View, Model} from 'backbone.marionette';
import Chart from 'chart.js';
import moment from 'moment';
import faker from 'faker';

export default View.extend({
    template: template,
    className: 'serial-chart',
    updateChart: function () {
        let {labels, datasets} = this.chart.data;
        let R_END = this.store.length;
        let R_START = this.store.length <= this.TICKS_TO_SHOW ? 0 : R_END - this.TICKS_TO_SHOW;

        if(this.store.length < this.TICKS_TO_STORE){
            this.store.unshift(this.model.get('def'))
        } else {
            this.store.unshift(this.model.get('def'));
            this.store.pop();
        }
        if(this.model.get('id') === 34){
            console.log(R_START, R_END);
        }
        datasets.forEach((set) => {
            set.data = this.store;
        });

        this.chart.update();
    },
    onDestroy: function () {
        clearInterval(this.updatingChart);
    },
    onPanLeft: function(){
        console.log('panned left')
    },
    onPanRight: function(){
        console.log('panned')
    },
    _bindTouchEvents: function(){
        let mc = new Hammer(this.el);
        mc.on("panleft", this.onPanLeft.bind(this));
        mc.on("panright", this.onPanRight.bind(this));
    },
    onRender: function () {
        let ctx = this.$('.canvas-chart')[0].getContext('2d');
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
                            maxTicksLimit: 20
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            //beginAtZero: true,
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
                //animation: false,
                legend: false,
                elements: { point: { radius: 0 } }
            }
        });
        this.updatingChart = setInterval(this.updateChart.bind(this), 1000);
        this._bindTouchEvents.call(this);
    },
    initialize: function () {
        this.store = [];
        this.MAX_SHOW = 1;
        this.TICKS_TO_STORE = 500;
        this.TICKS_TO_SHOW = 10;
        this.LABELS = this.TICKS_TO_SHOW + parseInt((( 30/ 100) * this.TICKS_TO_SHOW));
        this.listenTo(this.model, 'change:def', this.updateChart.bind(this))
    }
});