import i18next from 'i18next';

export default function (language, url) {
  return i18next.init({
    fallbackLng: language,
    debug: true,
    ns: ['special', 'common'],
    defaultNS: 'common',
    backend: {
      loadPath: `${url}/{{lng}}/{{ns}}.json`,
      crossDomain: true,
    },
  });
}
