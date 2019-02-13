const { Router } = require('express');

const router = Router();
const db = reqm('db');

const { History, DeviceServiceWork, DeviceServiceWorkTMC } = db;

router
  .get('/', (req, res, next) => {
    History.findAll().then((history) => {
      res.send(history);
    });
  });

router.get('/range', (req, res, next) => {
  const where = {};
  const order = ['id', 'ASC'];
  order[0] = req.query.order === 'time' ? 'date' : 'date';
  order[1] = req.query.orderDirection;


  +req.query.messageType !== 0 ? where.type = +req.query.messageType : null;
  +req.query.messageCode !== 0 ? where.code = +req.query.messageCode : null;

  const whereDate = {
    [Op.and]: [
      {
        date: {
          [Op.gte]: req.query.start,
        },
      },
      {
        date: {
          [Op.lte]: req.query.end,
        },
      },
    ],
  };
  History
    .findAll({
      where: Object.assign(where, whereDate),
      order: [order],

    })
    .then((events) => {
      res.send(events);
    });
});
router.get('/:id', (req, res, next) => {
  History.findAll({ where: { dev: req.params.id } }).then((history) => {
    res.send(history);
  });
});
router.post('/', (req, res, next) => {
  res.send(req.body);
});
router.post('/:id', (req, res, next) => {
  History.create(req.body).then((work) => {
    res.send(work);
  });

  History.create(req.body).then((history) => {
    const promises = [];
    DeviceServiceWork.findAll({ where: { service_id: req.params.id } }).then((deviceServiceWorks) => {
      deviceServiceWorks.map((deviceServicWork) => {
        promises.push(DeviceServiceWorkTMC.create({ item_id: history.get('id') }).then());
      });
    });
    Promise.all(promises).then(() => {
      res.send(history);
    });
  });
});
router.put('/:id', (req, res, next) => {
  res.send(`i am putting all tests stuff:${req.params.id}`);
});
router.delete('/:id', (req, res, next) => {
  res.send('i am deleting all tests stuff');
});

module.exports = router;
