const { Router } = require('express');

const db = reqm('db');
const { Translate, Type, Device, Service, DeviceService, Work, DeviceServiceWork, DeviceServiceWorkTMC, TMC } = db;
const router = Router();

router.get('/', (req, res, next) => {
  Type.findAll({
    include: [{
      model: Translate,
      as: 'translation',
      attributes: ['rus'],
    }],
  }).then((types) => {
    res.send(types);
  });
});
router.get('/update/:id', (req, res, next) => {
  Type.findAll({
    include: [{
      model: Service,
      as: 'services',
    }],
  }).then((types) => {
    const promises = [];
    console.log('Got types: ');
    types.forEach((type) => {
      promises.push(Device.findAll({ where: { typ: type.get('id') } }).then((devices) => {
        if (devices.length > 0) {
          console.log('Got devices: ', type.get('id'));
          const promises = [];
          devices.forEach((device) => {
            console.log('SINGLE DEVICE:  ', device.get('id'), '=====================================');
            DeviceService
              .findOrCreate({
                where: { ser_num: 1, dev: device.get('id') },
                defaults: {
                  dev: device.get('id'), ser_num: 1, service_id: type.get('services')[0].id, _lim: 111,
                },
              })
              .spread((deviceService, created) => {
                console.log('DeviceService ID is: ', deviceService.get('id'), '+++++++++++++++++++++++++++++++=');
                Work.findAll({ where: { to_id: type.services[0].id } }).then((works) => {
                  if (works.length > 0) {
                    works.forEach((work) => {
                      DeviceServiceWork.findOrCreate({
                        where: { dev: device.get('id'), work_id: work.get('id') },
                        defaults: {
                          dev: device.get('id'), ser_num: 1, work_id: work.get('id'), done: 0, service_id: deviceService.get('id'),
                        },
                      })
                        .spread((deviceServiceWork, created) => {
                          TMC.findAll({ where: { work_id: work.get('id') } }).then((TMCS) => {
                            if (TMCS.length > 0) {
                              TMCS.forEach((TMC) => {
                                console.log('TMC ID: ', TMC.get('id'), ')))))))))))))))))))))))))))))))))))))))))');
                                DeviceServiceWorkTMC.findOrCreate({ where: { item_id: TMC.get('id') }, defaults: { item_id: TMC.get('id') } })
                                  .spread((DeviceServiceWorkTMC) => {
                                    console.log(DeviceServiceWorkTMC);
                                  });
                              });
                            }
                          });
                          console.log('DeviceServiceWork ID: ', deviceServiceWork.get('id'), '*************************************************');
                        });
                    });
                  }
                });
              });
            DeviceService
              .findOrCreate({
                where: { ser_num: 2, dev: device.get('id') },
                defaults: {
                  dev: device.get('id'), ser_num: 2, service_id: type.get('services')[1].id, _lim: 222,
                },
              })
              .spread((deviceService, created) => {
                console.log('DeviceService ID is: ', deviceService.get('id'), '+++++++++++++++++++++++++++++++=');
                Work.findAll({ where: { to_id: type.services[1].id } }).then((works) => {
                  if (works.length > 0) {
                    works.forEach((work) => {
                      DeviceServiceWork.findOrCreate({
                        where: { dev: device.get('id'), work_id: work.get('id') },
                        defaults: {
                          dev: device.get('id'), ser_num: 1, work_id: work.get('id'), done: 0, service_id: deviceService.get('id'),
                        },
                      })
                        .spread((deviceServiceWork, created) => {
                          TMC.findAll({ where: { work_id: work.get('id') } }).then((TMCS) => {
                            if (TMCS.length > 0) {
                              TMCS.forEach((TMC) => {
                                console.log('TMC ID: ', TMC.get('id'), ')))))))))))))))))))))))))))))))))))))))))');
                                DeviceServiceWorkTMC.findOrCreate({ where: { item_id: TMC.get('id') }, defaults: { item_id: TMC.get('id') } })
                                  .spread((DeviceServiceWorkTMC) => {
                                    console.log(DeviceServiceWorkTMC);
                                  });
                              });
                            }
                          });
                          console.log('DeviceServiceWork ID: ', deviceServiceWork.get('id'), '*************************************************');
                        });
                    });
                  }
                });
              });
            DeviceService
              .findOrCreate({
                where: { ser_num: 3, dev: device.get('id') },
                defaults: {
                  dev: device.get('id'), ser_num: 3, service_id: type.get('services')[2].id, _lim: 333,
                },
              })
              .spread((deviceService, created) => {
                console.log('DeviceService ID is: ', deviceService.get('id'), '+++++++++++++++++++++++++++++++=');
                Work.findAll({ where: { to_id: type.services[2].id } }).then((works) => {
                  if (works.length > 0) {
                    works.forEach((work) => {
                      DeviceServiceWork.findOrCreate({
                        where: { dev: device.get('id'), work_id: work.get('id') },
                        defaults: {
                          dev: device.get('id'), ser_num: 1, work_id: work.get('id'), done: 0, service_id: deviceService.get('id'),
                        },
                      })
                        .spread((deviceServiceWork, created) => {
                          TMC.findAll({ where: { work_id: work.get('id') } }).then((TMCS) => {
                            if (TMCS.length > 0) {
                              TMCS.forEach((TMC) => {
                                console.log('TMC ID: ', TMC.get('id'), ')))))))))))))))))))))))))))))))))))))))))');
                                DeviceServiceWorkTMC.findOrCreate({ where: { item_id: TMC.get('id') }, defaults: { item_id: TMC.get('id') } })
                                  .spread((DeviceServiceWorkTMC) => {
                                    console.log(DeviceServiceWorkTMC);
                                  });
                              });
                            }
                          });
                          console.log('DeviceServiceWork ID: ', deviceServiceWork.get('id'), '*************************************************');
                        });
                    });
                  }
                });
              });
            DeviceService
              .findOrCreate({
                where: { ser_num: 4, dev: device.get('id') },
                defaults: {
                  dev: device.get('id'), ser_num: 4, service_id: type.get('services')[3].id, _lim: 666,
                },
              })
              .spread((deviceService, created) => {
                console.log('DeviceService ID is: ', deviceService.get('id'), '+++++++++++++++++++++++++++++++=');
                Work.findAll({ where: { to_id: type.services[3].id } }).then((works) => {
                  if (works.length > 0) {
                    works.forEach((work) => {
                      DeviceServiceWork.findOrCreate({
                        where: { dev: device.get('id'), work_id: work.get('id') },
                        defaults: {
                          dev: device.get('id'), ser_num: 1, work_id: work.get('id'), done: 0, service_id: deviceService.get('id'),
                        },
                      })
                        .spread((deviceServiceWork, created) => {
                          TMC.findAll({ where: { work_id: work.get('id') } }).then((TMCS) => {
                            if (TMCS.length > 0) {
                              TMCS.forEach((TMC) => {
                                console.log('TMC ID: ', TMC.get('id'), ')))))))))))))))))))))))))))))))))))))))))');
                                DeviceServiceWorkTMC.findOrCreate({ where: { item_id: TMC.get('id') }, defaults: { item_id: TMC.get('id') } })
                                  .spread((DeviceServiceWorkTMC) => {
                                    console.log(DeviceServiceWorkTMC);
                                  });
                              });
                            }
                          });
                          console.log('DeviceServiceWork ID: ', deviceServiceWork.get('id'), '*************************************************');
                        });
                    });
                  }
                });
              });
          });
        }
      }));
    });


    Promise.all(promises).then((data) => {
      console.log('They finished');
    });
    res.json(types);
  });
});

router.get('/:id', (req, res, next) => {
  Type.findAll({ where: { work_id: req.params.id } }).then((type) => {
    res.send(type);
  });
});

router.post('/', (req, res, next) => {
  res.send(req.body);
});
router.post('/:id', (req, res, next) => {
  Type.create(req.body).then((work) => {
    res.send(work);
  });
});

router.put('/:id', (req, res, next) => {
  res.send(`i am putting all tests stuff:${req.params.id}`);
});

router.delete('/:id', (req, res, next) => {
  res.send('i am deleting all tests stuff');
});

module.exports = router;
