import format from 'date-fns/format';

export default Backbone.Model.extend({
  defaults: {
    order: 'id',
    orderDirection: 'ASC',
    dateFrom: '2017-11-01',
    dateTo: format(new Date(), 'YYYY-MM-DD'),
    type: 'all',
    code: 'all',
    page: 2,
  },
  initialize() { },
});
