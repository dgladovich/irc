const { Router } = require('express');

const context = reqm('public/config.json');
const db = reqm('db');
const router = Router();

const env = process.env.NODE_ENV;
const {
  Device,
  DeviceWork,
  History,
  ViewGroup,
  ControllerFace,
  ValueMeasurment,
  Language,
  DeviceGroup,
  PassportData,
  PickingList,
  PickingListOpt,
  DeviceService,
  DeviceServiceWork,
  Work,
  WorkMaterial,
  Material,
  Type,
} = db;

router.get('/', (req, res, next) => {
  Device.findAll({
    where: { ctrl: context[env].controller, active: 1 },
    include: [
      {
        model: ControllerFace,
        as: 'faces',
        include: [{
          model: ValueMeasurment,
          as: 'measure',
          include: [{
            model: Language,
            as: 'translate',
          }],
        }],

      },
      {
        model: DeviceGroup,
        as: 'devicegroup',
      },
      {
        model: PassportData,
        as: 'passportdata',
      },
      {
        model: PickingList,
        as: 'pickinglist',
        include: [{
          model: PickingListOpt,
          as: 'opts',
        }],
      },
      {
        model: DeviceService,
        as: 'service',
        order: [['ser_num', 'ASC']],
        include: [
          {
            model: DeviceServiceWork,
            as: 'service_work',
            include: [
              {
                model: Work,
                as: 'works',
                include: [{
                  model: WorkMaterial,
                  as: 'materials',
                  include: [{
                    model: Material,
                    as: 'mat',
                  }],
                }],
              },
              {
                model: Type,
                as: 'devicetype',
                include: [{
                  model: Language,
                  as: 'translate',
                }],
              },
              {
                model: Device,
                as: 'controller',
              },
            ],
          },
        ],
      }],
  }).then((devices) => {
    res.send(devices);
  }).catch((err) => {
    res.send({ errors: err });
  });
});
router.get('/:id/services', (req, res, next) => {
  DeviceService.findAll({ where: { dev: req.params.id } }).then((services) => {
    res.send(services);
  });
});
router.get('/viewgroups', (req, res, next) => {
  ViewGroup.findAll({ where: {}, include: [{ model: Language, as: 'translate' }] }).then((views) => {
    res.json(views);
  });
});
router.get('/groups', (req, res, next) => {
  DeviceGroup.findAll({
    where: {},
    include: [{ model: Device, as: 'devices', where: { ctrl: context.controller } }],
  }).then((groups) => {
    res.json(groups);
  });
});
router.get('/services/:id/works', (req, res, next) => {
  DeviceWork.findAll({
    where: { service_id: req.params.id },
    include: [{ model: Work, as: 'description' }],
  }).then((works) => {
    res.send(works);
  });
});
router.get('/:id', (req, res, next) => {
  res.send(`i am getting stuff with id:${req.params.id}`);
});
router.post('/:id', (req, res, next) => {
  res.send('i am posting all tests stuff');
});
router.put('/:id', (req, res, next) => {
  Device.update(req.body, { where: { id: req.params.id } }).then(() => {
    Device.findById(req.params.id).then((deviceService) => {
      res.send(deviceService);
    });
  });
});

router.put('/:deviceID/services/:serviceID', (req, res, next) => {
  DeviceService
    .update(req.body, { where: { id: req.params.serviceID } })
    .then((deviceService) => {
      DeviceWork.findAll({
        where: { service_id: req.params.serviceID },
        include: [{ model: Work, as: 'description' }],
      }).then((deviceServiceWorks) => {
        const promises = [];
        let doneWorks = '';
        deviceServiceWorks.forEach((deviceServiceWork) => {
          if (deviceServiceWork.get('done') === 1) {
            doneWorks += `${deviceServiceWork.get('description').desc}, `;
          } else {
            doneWorks += '';
          }
        });
        doneWorks += ';';

        DeviceWork.update({ done: 0 }, { where: { service_id: req.params.serviceID } }).then(() => {
          History
            .create({
              dev: req.params.deviceID,
              txt: `Проведено ТО${req.body.ser_num}; Выполнил: администратор; Выполненые работы: ${doneWorks} Дата проведения: ${new Date()}`,
              usr: 1,
            })
            .then(() => {
              DeviceService.findById(req.params.serviceID).then((devServ) => {
                res.json(devServ);
              });
            });
        });
      });
    });
});
router.put('/:deviceID/unsheduled', (req, res, next) => {
  History
    .create({
      dev: req.params.deviceID,
      txt: `Выполнен внеплановый ремонт:${req.body.txt}; Выполнил: администратор; Дата проведения: ${new Date()}`,
      usr: 1,
    })
    .then(() => {
      DeviceService.findById(req.params.serviceID).then((devServ) => {
        res.json(devServ);
      });
    });
});
router.put('/services/:serviceID/works/:workID', (req, res, next) => {
  DeviceWork
    .update(req.body, { where: { id: req.params.workID } })
    .then((deviceServiceWork) => {
      History
        .create({
          dev: req.body.dev,
          txt: `Выполнена работа:${req.body.ser_num}; Выполнил: администратор; Дата проведения: ${new Date()}`,
          usr: 1,
        })
        .then(() => {
          DeviceWork
            .findById(req.params.workID)
            .then((devServWork) => {
              res.json(devServWork);
            });
        });
    });
});
router.delete('/:id', (req, res, next) => {
  res.send('i am deleting all tests stuff');
});

module.exports = router;
