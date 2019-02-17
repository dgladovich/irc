import i18next from 'i18next';

export default async function (language, url) {
  return i18next.init({
    fallbackLng: language,
    debug: true,
    ns: ['special', 'common'],
    defaultNS: 'common',
  });
}
