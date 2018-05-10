import template from './templates/chart.jst';
import { View, Model } from 'backbone.marionette';
import Chart from 'chart.js';
import moment from 'moment';
import faker from 'faker';

export default View.extend({
    template: template,
    className: 'serial-chart',
    updateChart: function(){
        let { labels, datasets } = this.chart.data;
        let maxLabels = 10;
        let time = moment().format('HH:MM:ss');
        if(labels.length < maxLabels){
            labels.push(time);
            datasets.forEach((set)=>{
                let data = set.data;
                data.push(this.model.get('def'))
            })
        } else {
            labels.shift();
            labels.push(time);
            datasets.forEach((set)=>{
                let data = set.data;
                data.shift();
                data.push(this.model.get('def'))
            })
        }
        this.chart.update();
    },
    onDestroy: function(){
        clearInterval(this.updatingChart);
    },
    onRender: function(){
        let ctx = this.$('.canvas-chart')[0].getContext('2d');
        let labelText = this.model.get('translate');

        console.log(faker)
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: labelText,
                    data: [],
                    backgroundColor: [
                        faker.commerce.color()
                    ],
                    borderColor: [
                        'rgba(225,44,13,1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
                animation: false
            }
        });
        this.updatingChart = setInterval(this.updateChart.bind(this), 1000);
    },
    initialize: function(){
        this.listenTo(this.model, 'change:def', this.updateChart.bind(this))
    }
});