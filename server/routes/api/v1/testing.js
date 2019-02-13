const { Router } = require('express');
const faker = require('faker');

const db = reqm('db');
const { Alarms } = db;
const router = Router();

router.get('/seed_alarms', (req, res) => {
  const alarms = [];
  for (let i = 0; i < 50; i++) {
    alarms.push({
      ctrl: 2,
      dev: faker.random.number(),
      typ: faker.random.number(),
      par: faker.random.number(),
      num: faker.random.number(),
      dat: moment(faker.date.past()).format(),
    });
  }
  Alarms.bulkCreate(alarms).then(() => {
    res.json({ success: true });
  });
});
module.exports = router;
