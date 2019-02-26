import ru from 'fullcalendar/dist/locale/ru';
import en from 'fullcalendar/dist/locale/en-gb';
import { View, Model } from 'backbone.marionette';
import moment from 'moment';
import template from './templates/calendars.jst';


export default View.extend({
  template,
  regions: {
    from: '#calendar-from',
    to: '#calendar-to',
  },
  updateTime() {
    const moto = this.controller.get('moto');


    const previuos = this.model.get('_pre');


    const limit = this.model.get('_lim');


    const left = limit - (moto - previuos);

    left <= 0 ? leftText = 'ТО просрочено на: ' : leftText = 'Осталось до ТО: ';


    this.$('#time-left').html(leftText + left);
    return this;
  },

  onRender() {
    this.$('#calendar-from').fullCalendar({
      events: this.calendarService,
      height: 'auto',
      eventRender: (event, element, view) => {
        const start = event.start.format('YYYY-MM-DD');


        const daysService = _.where(this.calendarService, { dateTime: start });


        let dayTitle = '';
        daysService.map((service) => {
          dayTitle += `${service.devName}: <br> ${service.title}`;
        });
        if (event.start.isAfter(moment())) {
          setTimeout(() => {
            $(`.fc-day-top[data-date="${start}"] .fc-day-number`)
              .addClass('att')
              .tooltip({
                html: true,
                title: dayTitle,
                placement: 'auto top',
              });
          }, 100);
        } else {
          setTimeout(() => {
            $(`.fc-day-top[data-date="${start}"] .fc-day-number`)
              .addClass('danger')
              .tooltip({
                html: true,
                title: dayTitle,
                placement: 'auto top',
              });
          }, 100);
        }
      },
    });
    this.$('#calendar-to').fullCalendar({
      defaultDate: moment().add(1, 'month'),
      events: this.calendarService,
      height: 'auto',
      eventRender: (event, element, view) => {
        const start = event.start.format('YYYY-MM-DD');


        const daysService = _.where(this.calendarService, { dateTime: start });


        let dayTitle = '';
        daysService.map((service) => {
          dayTitle += `${service.devName}: <br> ${service.title}`;
        });

        if (event.start.isAfter(moment())) {
          setTimeout(() => {
            $(`.fc-day-top[data-date="${start}"] .fc-day-number`)
              .addClass('att')
              .tooltip({
                html: true,
                title: dayTitle,
              });
          }, 100);
        } else {
          setTimeout(() => {
            $(`.fc-day-top[data-date="${start}"] .fc-day-number`)
              .addClass('danger')
              .tooltip({
                html: true,
                title: dayTitle,
              });
          }, 100);
        }
      },
    });
  },
  initialize() {
    this.calendarService = [];

    app.devices.each((device) => {
      const service = app.services.where({ dev: device.get('id') });


      const devName = device.get('name');


      const moto = device.get('moto');
      if (service.length > 0) {
        service.map((serv) => {
          if (serv.ser_num !== 1) {
            const previuos = serv._pre;


            const limit = serv._lim;


            const left = limit - (moto - previuos);
            if (left <= 0) {
              this.calendarService.push({
                title: `TO${serv.ser_num}`,
                start: moment(),
                devName: `${devName.split(' ')[0]}`,
                allDay: true,
                dateTime: moment().format('YYYY-MM-DD'),
                rendering: 'background',
                backgroundColor: 'transparent',
              });
            } else if (left > 0) {
              this.calendarService.push({
                title: `TO${serv.ser_num}`,
                devName: `${devName.split(' ')[0]}`,
                start: moment().add(left, 'hours'),
                allDay: true,
                dateTime: moment().add(left, 'hours').format('YYYY-MM-DD'),
                rendering: 'background',
                backgroundColor: 'transparent',
              });
            }
          }
        });
      }
    });
  },
});
