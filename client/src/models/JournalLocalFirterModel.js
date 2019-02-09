import moment from 'moment';

export default Backbone.Model.extend({
  defaults: {
    order: 'id',
    orderDirection: 'ASC',
    dateFrom: '2017-11-01',
    dateTo: moment().format('YYYY-MM-DD'),
    type: 0,
    code: 'all',
  },
  initialize() {},
});
