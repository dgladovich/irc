const { Router } = require('express');

const db = reqm('db');

const router = Router();

const {
  ValueStatuses,
  Language,
} = db;

router.get('/', (req, res, next) => {
  ValueStatuses
    .findAll({
      include: [
        {
          models: Language,
          as: 'translate',
        },
      ],
    })
    .then((statuses) => {
      res.json({
        data: {
          statuses,
        },
      });
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

module.exports = router;
