const { Router } = require('express');

const router = new Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
  });
});

module.exports = router;
