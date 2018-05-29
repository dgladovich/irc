import template from './templates/analitics.jst';
import anal_template from './templates/anal_template.jst';
import {View} from 'backbone.marionette';
import moment from 'moment';
import Spinner from 'spin.js';
import Chart from 'chart.js';
import aja from 'aja';

export default View.extend({
    template: template,
    analTemplate: anal_template,
    regions: {
        chart: {
            el: "#chart"
        },
        text: {
            el: '#anal'
        }
    },
    onBeforeRender: function () {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.context.canvas.height = 70;
    },
    anal: function (data) {
        let clrs = {
            name: {
                0: 'Готов',
                1: 'В работе',
                2: 'Авария',
                3: 'Требует ремонта',
                4: 'Мануал',
                5: 'В ремонте',
                6: 'Нет связи',
                9: 'Нет связи'
            },
            color: {
                0: '#ccc',
                1: '#0db800',
                2: '#e12c0d',
                3: '#ffa200',
                4: '#ffa200',
                5: '#0d7fe1',
                6: '#0CBBFF',
                9: '#0CBBFF'
            }
        };
        let arr = [], f = 0;
        _.each(data, (v, k, o) => {
            arr.push({
                label: '',
                fontColor: '#ccc',
                backgroundColor: clrs.color[o[k].stat],
                borderColor: clrs.color[o[k].stat],
                fill: false,
                borderWidth: 15,
                pointRadius: 0,
                margin: 25,
                data: [{x: o[k].start_date, y: o[k].stat}, {x: o[k].end_date, y: o[k].stat}]
            })
        });
        return arr;
    },
    showChart: function (d) {
        let chronology = this.anal(this.model.get('history_events'));
        Chart.defaults.global.defaultFontColor = '#ccc';
        Chart.defaults.global.defaultFontSize = 12.5;
        this.Chart = new Chart(this.context, {
            type: 'line',
            data: {
                datasets: chronology
            },
            options: {
                title: {
                    display: true,
                    text: 'Хронология за последние 24 часа',
                    fontSize: '20',
                    fontColor: '#ccc'
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            format: 'HH:mm:ss',
                            displayFormats: {
                                hour: 'HH:mm:ss',
                                minute: 'HH:mm:ss',
                                second: 'HH:mm:ss'
                            }
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            max: 7,
                            stepSize: 1,
                            callback: function (value) {
                                switch (parseInt(value)) {
                                    case 0:
                                        value = "Готов";
                                        break;
                                    case 1:
                                        value = "В работе";
                                        break;
                                    case 2:
                                        value = "Авария";
                                        break;
                                    case 3:
                                        value = "Требует ремонта";
                                        break;
                                    case 4:
                                        value = "В ремонте";
                                        break;
                                    case 5:
                                        value = "Ручной";
                                        break;
                                    case 6:
                                        value = "Нет связи";
                                        break;
                                    case 7:
                                        value = "";
                                        break;
                                }
                                return value;
                            }
                        }
                    }]
                }
            }
        });
    },
    updateAnalitics: function (analitics) {
        this.model.set('history_events', analitics.history_events);
        let {worktime_count, errortime_delay, crashes_count, load_percent} = analitics;
        this.$('#anal').html(anal);
        this.$('#chart').append(this.canvas);
        this.showChart()
    },
    _requestAnalitics: function(){
        return $.get('bot')
    },
    onRender: function () {
        let device = app.devices.findWhere({parent: 0});
        this._requestAnalitics().then((data)=>{
            let anal = this.analTemplate(data);
            this.$('#anal').html(anal);
        })
    }
});