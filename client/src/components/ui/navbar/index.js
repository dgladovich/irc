import Marionette from 'backbone.marionette';
import template from './navbar.jst';
import Network from './icons/network';
import ControllerActivity from './icons/controller';
import Cloud from './icons/zeocloud';
import Messages from './icons/messages';
import Bot from './icons/bot';
import Settings from './icons/settings';
import UserDropdown from './icons/user';


export default Marionette.View.extend({
  template,
  tagName: 'header',
  regions: {
    network: '#network',
    controller: '#controller',
    cloud: '#cloud',
    messages: '#messages',
    bot: '#bot',
    settings: '#settings',
    user: '#user',
  },
  onRender() {
    this.showChildView('network', new Network());
    this.showChildView('controller', new ControllerActivity());
    this.showChildView('cloud', new Cloud());
    this.showChildView('messages', new Messages());
    this.showChildView('bot', new Bot());
    this.showChildView('settings', new Settings());
    this.showChildView('user', new UserDropdown());
  },
});
