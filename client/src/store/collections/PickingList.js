import { Collection } from 'backbone';
import Status from '../models/Status';

export default Collection.extend({
  url: 'statuses',
  model: Status,
});
