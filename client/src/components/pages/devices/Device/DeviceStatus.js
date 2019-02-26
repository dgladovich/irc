import { View } from 'backbone.marionette';
import { t } from 'i18next';
import template from './templates/status.jst';
import errocode_template from './templates/errorcode_template.jst';


const ErrorCodeView = View.extend({
  template: errocode_template,
  initialize() {
    this.listenTo(this.model, 'change:id', this.render.bind(this));
  },
});
const ErrorCodeModel = Backbone.Model.extend({
  initialize() {
    this.set(app.errors.findWhere({
      id: this.get('dev').get('ecode'),
    }).toJSON());
    this.listenTo(this.get('dev'), 'change:ecode', (dev) => {
      const errorCode = app
        .errors
        .findWhere({ id: this.get('dev').get('ecode') })
        .toJSON();
      this.set(errorCode);
    });
  },
});

export default View.extend({
  template,
  regions: {
    errorMessage: '.panel-body',
  },
  onRender() {
    this.updateStatus.call(this);
    this.showChildView('errorMessage', this.errorCodeView);
  },
  updateStatus() {
    const title = this.$('.panel-title');
    title.removeClass(this.previousClass);
    const deviceStatus = app.statuses.findWhere({ id: this.model.get('sgrp') }).get('sgrps_opts').findWhere({ num: this.model.get('stat') });
    if (deviceStatus !== undefined) {
      this.previousClass = deviceStatus.get('dclass');
      const statusTranslate = t(deviceStatus.get('name'));
      this.$('.controller-modal-status').html(statusTranslate);
    } else {
      this.previousClass = 'off';
      console.log(`Get wrong status; Device${this.model.get('id')}; Status:${this.model.get('stat')}; Group:${this.model.get('sgrp')}`);
    }

    title.addClass(this.previousClass);
  },
  onDestroy() {
    this.stopListening();
  },
  initialize() {
    this.errorCodeView = new ErrorCodeView({ model: new ErrorCodeModel({ dev: this.model }) });
    this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this));
    // this.errorCodeView.listenTo(this.model, 'change:ecode', this.errorCodeView.render.bind(this.errorCodeView));
  },
});
