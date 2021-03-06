const { Router } = require('express');
const faker = require('faker');
const moment = require('moment');
const _ = require('lodash');

const config = reqm('public/config.json');
const db = reqm('db');

const router = Router();
const { Registering, Sequelize } = db;
const { Op } = Sequelize;
const faces = _.toArray(config.ctrl.cfaces);

router.get('/', (req, res, next) => {
  const { from, to } = req.query;
  const PAGE_NUMBER = req.query.page || 1;
  const ITEMS_PER_PAGE = 100;
  const OFFSET = ITEMS_PER_PAGE * (PAGE_NUMBER - 1);
  if (from && to) {
    Registering
      .findAll({
        where: {
          created_at: { [Op.between]: [from, to] },
        },
        limit: ITEMS_PER_PAGE,
        order: [['created_at', 'DESC']],
        offset: OFFSET,
      })
      .then((values) => {
        res.json(values);
      });
  } else {
    res.send('not used parameters');
  }
});
router.get('/seed', (req, res, next) => {
  const values = [];
  for (let i = 0; i < 1000000; i++) {
    const face = _.sample(faces);
    values.push({
      face_id: face.id,
      def: _.random(face.min_val, face.max_val),
      created_at: faker.date.between('2018-01-01', '2018-12-31'),
    });
  }
  Registering
    .bulkCreate(values)
    .then(() => {
      res.send('Seeded successfully');
    });
});


module.exports = router;
