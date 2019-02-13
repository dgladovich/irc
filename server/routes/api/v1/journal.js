const { Router } = require('express');
const moment = require('moment');
const _ = require('lodash');

const db = reqm('db');

const router = Router();

const { Op } = db.Sequelize;
const { Alarm, User, ErrorCode, DeviceService, Device, DeviceServiceWork, Journal, Service, Type } = db;
const { CONTROLLER_ID } = process.env.CONTROLLER_ID;

router.get('/', (req, res, next) => {
  const where = {};
  const whereType = {};
  let whereDate = {};
  const order = ['id', 'ASC'];
  const items = 20;
  const page = 1;
  let offset = 0;
  if (!_.isEmpty(req.query)) {
    req.query.type !== 'all' ? whereType.typ = +req.query.type : delete whereType.typ;
    req.query.code !== 'all' ? where.code = +req.query.code : delete where.code;

    whereDate = {
      [Op.and]: [{
        date: {
          [Op.gte]: req.query.dateFrom,
        },
      },
      {
        date: {
          [Op.lte]: `${req.query.dateTo} 23:59:59Z`,
        },
      },
      ],
    };
  }
  if (req.query.page) {
    offset = items * (req.query.page - 1);
  }
  where.ctrl = CONTROLLER_ID;
  Alarm.findAll({
    limit: items,
    offset,
    order: [
      ['id', 'DESC'],
    ],
    where: Object.assign(where, whereDate),
    include: [{
      model: User,
      as: 'user',
      attributes: ['name'],
    }],
  }).then((alarms) => {
    res.json(alarms);
  });
});
router.get('/events', (req, res, next) => {
  Journal
    .findAll({
      where: {
        [Op.and]: [{
          expiration_date: {
            [Op.gte]: req.query.start,
          },
        },
        {
          expiration_date: {
            [Op.lte]: req.query.end,
          },
        },
        ],
      },
      attributes: [
        'id', ['expiration_date', 'start'],
        'status',
        'transfer', ['service_id', 'resourceId'],
      ],
      include: [{
        model: DeviceService,
        as: 'service',
        include: [{
          model: Device,
          as: 'controller',
        }],
      }],
    })
    .then((events) => {
      Promise.all(events.map((e, i) => {
        const service = e.get('service');
        if (service !== null) {
          const device = service.get('controller');
          const start = moment(e.get('start')).add(e.get('transfer'), 'days').format('YYYY-MM-DD');
          let backgroundColor = 'blue';
          let borderColor = 'blue';
          if (moment(start).isBefore(moment())) {
            backgroundColor = '#B33A3A';
            borderColor = 'rgb(197, 103, 103)';
          } else if (moment(start).diff(moment(), 'days') >= 0 && moment(start).diff(moment(), 'days') <= 1) {
            backgroundColor = '#FFCC00';
            borderColor = '#FFCC00';
          }
          return {
            id: e.get('id'),
            start,
            status: e.get('status'),
            transfer: e.get('transfer'),
            resourceId: device.get('id'),
            title: `ТО${service.get('ser_num')} - ${device.get('name')}`,
            backgroundColor,
            borderColor,

          };
        }
        return {};
      })).then((data) => {
        res.json(data);
      });
    });
});
router.get('/resources', (req, res, next) => {
  Journal
    .findAll({
      where: {
        [Op.and]: [{
          expiration_date: {
            [Op.gte]: req.query.start,
          },
        },
        {
          expiration_date: {
            [Op.lte]: req.query.end,
          },
        },
        ],
      },
      attributes: ['id', 'service_id'],
      include: [{
        model: DeviceService,

        as: 'service',
        include: [{
          distinct: 'service_id',
          model: Device,
          as: 'controller',
        },
        {
          model: DeviceServiceWork,
          as: 'service_work',
          include: [{
            model: Work,
            as: 'works',
            foreignKey: 'work_id',
            attributes: ['desc'],
          }],
        },
        ],

      }],
    })
    .then((events) => {
      Promise.all(events.map((e, i) => {
        const service = e.get('service');
        if (service !== null) {
          const device = service.get('controller');
          return {
            id: device.get('id'),
            title: device.get('name'),
            serviceId: service.get('service_id'),
            children: [],
          };
        }
        return {};
      })).then((data) => {
        res.json(data);
      });
    });
});
router.get('/update/calendar', (req, res, next) => {
  DeviceService
    .findAll({
      include: [{ model: Device, as: 'controller' },
      {
        as: 'service',
        model: Service,
        where: {
          ser_type: 'calendar',
        },
      },
      ],
    })
    .then((deviceServices) => {
      const promises = [];
      deviceServices.forEach((deviceService) => {
        const startDate = deviceService.get('controller').get('start_date');

        const duration = moment.duration(deviceService.get('service').get('_set'), 'month');
        const expDate = moment(startDate).add(duration).format();
        promises.push(
          Journal.findOrCreate({
            where: {
              service_id: deviceService.get('id'),
              status: 'pending',
            },
            defaults: {
              service_id: deviceService.get('id'),
              status: 'pending',
              expiration_date: expDate,
            },
          }),
        );
      });
      Promise.all(promises).then(() => {
        console.log('this shit finished');
        res.json(deviceServices);
      });
    });
});
router.get('/update/hourly', (req, res, next) => {
  DeviceService
    .findAll({
      include: [{
        model: Device,
        as: 'controller',
      },

      {
        as: 'service',
        model: Service,
        where: {
          ser_type: 'hourly',
        },
      },
      ],
    })
    .then((deviceServices) => {
      Promise
        .all(deviceServices.map((deviceService, i) => {
          const device = deviceService.get('controller');
          const moto = device.get('moto');
          const service = deviceService.get('service');
          const startDate = moment(device.get('start_date'));
          const duration = moment.duration(deviceService.get('_lim') + deviceService.get('_pre') - moto, 'hours');
          const expDate = moment(startDate).add(duration).format();
          return Journal.findOne({
            where: {
              service_id: deviceService.get('id'),
              status: 'pending',
            },
          }).then((journal) => {
            if (journal) { // update
              return journal.update({
                service_id: deviceService.get('id'),
                status: 'pending',
                expiration_date: expDate,
              });
            }
            return Journal.create({
              service_id: deviceService.get('id'),
              status: 'pending',
              expiration_date: expDate,
            });
          });
        }))
        .then((data) => {
          res.json(data);
        });
    });
});
router.get('/danger', (req, res, next) => {
  Alarm
    .findAll({
      where: {
        usr_confirm: 0,
        ctrl: context.controller,
      },
      order: [
        ['id', 'DESC'],
      ],
      include: [{
        model: User,
        as: 'user',
        attributes: ['name'],
      }, {
        model: ErrorCode,
        as: 'ecode',
        // required: false,
        where: {
          typ: 2,
        },
      }],
    })
    .then((alarms) => {
      res.json(alarms);
    })
    .catch((err) => {
      console.log(err);
      res.json({
        errors: {
          code: err,
        },
      });
    });
});

router.get('/:id', (req, res, next) => {
  res.send(`i am getting stuff with id:${req.params.id}`);
});

router.get('/newupdate', (req, res, next) => {
  console.log('this route works fine');
  Type.findAll({
    include: [{
      model: Service,
      as: 'service',
    }],
  });
});

module.exports = router;
