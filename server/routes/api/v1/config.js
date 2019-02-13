const { Router } = require('express');

const router = Router();
const path = require('path');
const locale = require('locale');

const supported = new locale.Locales(['en', 'ru', 'ua']);

router.get('/', (req, res, next) => {
  res.sendFile(path.resolve('./config.json'));
});

router.get('/locale', (req, res, next) => {
  let lang;
  if (req.session.lang) {
    lang = req.session.lang;
  } else {
    const locales = new locale.Locales(req.headers['accept-language']);
    const best = locales.best(supported);
    lang = best.language;
  }

  res.sendFile(path.resolve(`./locales/lang_${lang}.json`));
});

router.get('/locale/:lang', (req, res, next) => {
  const lang = req.params.lang;
  req.session.lang = lang;
  res.sendFile(path.resolve(`./locales/lang_${lang}.json`));
});


module.exports = router;
