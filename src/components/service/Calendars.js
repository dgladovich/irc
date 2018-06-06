import ru from 'fullcalendar/dist/locale/ru';
import template from './templates/calendars.jst';
import {View, Model} from 'backbone.marionette';
import moment from 'moment';


export default View.extend({
    template: template,
    regions: {
        from: '#calendar-from',
        to: '#calendar-to',
    },
    updateTime: function () {
        let moto = this.device.get('moto'),
            previuos = this.model.get('_pre'),
            limit = this.model.get('_lim'),
            left = limit - (moto - previuos);

        left <= 0 ? leftText = 'ТО просрочено на: ' : leftText = 'Осталось до ТО: ';


        this.$('#time-left').html(leftText + left);
        return this;
    },

    onRender: function () {
        this.$('#calendar-from').fullCalendar({
            events: this.calendarService,
            height: 'auto',
            eventRender: (event, element, view) => {
                let start = event.start.format('YYYY-MM-DD'),
                    daysService = _.where(this.calendarService, {dateTime: start}),
                    dayTitle = ``;
                daysService.map((service) => {
                    dayTitle += `${service.devName}: <br> ${service.title}`
                });
                if (event.start.isAfter(moment())) {
                    setTimeout(() => {
                        $(`.fc-day-top[data-date="${start}"] .fc-day-number`)
                            .addClass("att")
                            .tooltip({
                                html: true,
                                title: dayTitle,
                                placement: 'auto top'
                            });
                    }, 100)
                } else {
                    setTimeout(() => {
                        $(`.fc-day-top[data-date="${start}"] .fc-day-number`)
                            .addClass("danger")
                            .tooltip({
                                html: true,
                                title: dayTitle,
                                placement: 'auto top'
                            });
                    }, 100)
                }

            }
        });
        this.$('#calendar-to').fullCalendar({
            defaultDate: moment().add(1, 'month'),
            events: this.calendarService,
            height: 'auto',
            eventRender: (event, element, view) => {
                let start = event.start.format('YYYY-MM-DD'),
                    daysService = _.where(this.calendarService, {dateTime: start}),
                    dayTitle = ``;
                daysService.map((service) => {
                    dayTitle += `${service.devName}: <br> ${service.title}`
                });

                if (event.start.isAfter(moment())) {
                    setTimeout(() => {
                        $(`.fc-day-top[data-date="${start}"] .fc-day-number`)
                            .addClass("att")
                            .tooltip({
                                html: true,
                                title: dayTitle,
                            });
                    }, 100)
                } else {
                    setTimeout(() => {
                        $(`.fc-day-top[data-date="${start}"] .fc-day-number`)
                            .addClass("danger")
                            .tooltip({
                                html: true,
                                title: dayTitle,
                            });
                    }, 100)
                }

            }
        });
    },
    initialize: function () {
        this.calendarService = [];

        app.devices.each((device) => {
            let service = app.services.where({dev: device.get('id')}),
                devName = device.get('name'),
                moto = device.get('moto');
            if (service.length > 0) {
                service.map((serv) => {
                    if (serv.ser_num !== 1) {
                        let previuos = serv._pre,
                            limit = serv._lim,
                            left = limit - (moto - previuos);
                        if (left <= 0) {
                            this.calendarService.push({
                                title: `TO${serv.ser_num}`,
                                start: moment(),
                                devName: `${devName.split(' ')[0]}`,
                                allDay: true,
                                dateTime: moment().format('YYYY-MM-DD'),
                                rendering: 'background',
                                backgroundColor: 'transparent'
                            })
                        } else if (left > 0) {
                            this.calendarService.push({
                                title: `TO${serv.ser_num}`,
                                devName: `${devName.split(' ')[0]}`,
                                start: moment().add(left, 'hours'),
                                allDay: true,
                                dateTime: moment().add(left, 'hours').format('YYYY-MM-DD'),
                                rendering: 'background',
                                backgroundColor: 'transparent'
                            });
                        }
                    }
                })
            }
        });
    }
});