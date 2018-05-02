import template from './templates/analitics.jst';
import Radio from 'backbone.radio';
import {View} from 'backbone.marionette';
import moment from 'moment';
import Spinner from 'spin.js';
import Chart from 'chart.js';

const bot = Radio.channel('bot');

export default View.extend({
    template: template,
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
        let text = `<p>${app.infos.findWhere({id: analitics.info}).get('text')}</p>`,
            adviceTitle = `<h4 style="text-align: center; font-weight: 600">Совет дня:</h4>`
        let {worktime_count, errortime_delay, crashes_count, load_percent} = analitics;
        let style = `style='line-height: 16px;padding-left: 40px; text-indent: 20px'`;
        let anal = `<div ${style}>${adviceTitle}<br> ${text} <br><br>
            <h4 style="text-align: center; font-weight: 600">Аналитика</h4><br>
            <p>За последние 24 часа оборудование отработало ${worktime_count} час(ов).</p>
            <p>Простой по причине аварии: ${moment(errortime_delay).format('HH:mm:ss:SSS')} часов.</p>
            <p>Количество аварий: ${crashes_count}.</p>
            <p>Средняя загрузка оборудования составила ${load_percent} %.</p> 
            <p>Температурный режим механизма не выходил за пределы нормы.</p>
            <p>Вибрация оборудования была в пределах нормы. </p>
            <p>Техническое обслуживание не требуется. </p>
            <p>Ближайшее ТО2 через ${_.random(12, 74)} часов.</p> 
            <p>Потреблено ${_.random(5, 15)} кВт.</p></div>`;
        this.$('#anal').html(anal);
        this.$('#chart').append(this.canvas);
        this.showChart()
    },
    onRender: function () {
        let device = app.devices.findWhere({parent: 0});
        var spinner = new Spinner({
            color: '#ccc',
            marginTop: '40%',
            left: '30%',
            //margin: 100,
            position: 'relative'
        }).spin();
        this.$('#anal').html(spinner.el);
        bot.trigger('analyze:request', {
            ctrl: device.get('ctrl'),
            dev: device.get('id'),
            type: 0
        });
    },
    initialize: function () {
        this.model = new Backbone.Model();
        this.listenTo(bot, 'analyze:info', this.updateAnalitics.bind(this));
    }
});