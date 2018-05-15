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
        const MAX_LABELS = 30;
        const MAX_TICKS = 450;
        let time = moment().format('HH:MM:ss');
        datasets.forEach((set) => {
            let data = set.data;
            if(data.length < MAX_TICKS){
                data.unshift(this.model.get('def'));
            } else {
                data.unshift(this.model.get('def'));
                data.pop();
            }
        })
/*        if (labels.length < MAX_LABELS) {
            labels.push(time);
            datasets.forEach((set) => {
                let data = set.data;
                data.push(this.model.get('def'))
            })
        } else {
            labels.shift();
            labels.push(time);
            datasets.forEach((set) => {
                let data = set.data;
                data.shift();
                data.push(this.model.get('def'))
            })
        }*/
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
        labels.length = 500;
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
        this.listenTo(this.model, 'change:def', this.updateChart.bind(this))
    }
});