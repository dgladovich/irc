import { View, Model } from 'backbone.marionette';
import Radio from 'backbone.radio';
import { t } from 'i18next';

import template from './templates/work.jst';

const serviceChannel = Radio.channel('servicechannel');

export default View.extend({
  template,
  events: {
    'change .work-done': 'onDoneWork',
  },
  onRender() {
    this.updatePerforming();
  },
  onDoneWork(e) {
    if ($(e.currentTarget).is(':checked')) {
      this.model.set('selected', true);
    } else {
      this.model.set('selected', false);
    }
  },
  updatePerforming() {
    if (this.model.get('perform') === 1) {
      this.$('.work-done')
        .css({
          visibility: 'hidden',
        })
        .prop('disabled', true);

      this.$('ul').css('text-decoration', 'line-through');
    } else {
      this.$('.work-done')
        .css({
          visibility: 'visible',
        })
        .prop({ disabled: false, checked: false });

      this.$('ul').css('text-decoration', 'none');
    }
  },
  fixString(worksString) {
    const nstr = worksString.split('\n').map(string => `<li>${string.replace(/\d./g, '').trim()}</li>`);
    return `<ul>${nstr.join('')}</ul>`;
  },
  initialize() {
    let name;
    let hui;
    const type = this.model.get('devicetype');
    serviceChannel.on(`work:perform:${this.model.get('id')}`, () => {
      this.model.set({
        perform: 1,
        selected: 0,
      });
    });
    serviceChannel.on('service:done', () => {
      this.model.set({
        perform: 0,
        selected: false,
      });
      this.updatePerforming();
    });
    /*
        let device = this.model.get('device');
        if(!_.isNull(device)){
            name = device.name;
        } else {
            console.log(this.model.get('id'))
        }
*/

    if (!_.isNull(type)) {
      name = t(type.name);
    }
    this.model.set({
      worksList: this.fixString(this.model.get('works').des),
      deviceName: name,
    });
    this.listenTo(this.model, 'change:perform', this.updatePerforming.bind(this));
    this.listenTo(this.model, 'change:selected', () => {
      this.model.collection.trigger('checkwork');
    });
  },
});
