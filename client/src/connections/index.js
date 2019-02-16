import ControllerConnection from './Controller';
import SupportConnection from './Support';

export default class ConnectionHanlder {
  constructor() {
    this.controller = new ControllerConnection();
    this.support = new SupportConnection();
  }

  subscribe() { }

  unsubscribe() { }
}
