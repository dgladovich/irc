import { View, Model, CollectionView } from 'backbone.marionette';
import table_head from './templates/group/values/table_head.jst';
import body_row from './templates/group/values/body_row.jst';
import table_template from '../../devices/DeviceGroup/templates/table_template.jst';


const BodyRowView = View.extend({
  tagName: 'tr',
  template: body_row,
  onRender() {
    this.updateStatus.call(this);
  },
  updateStatus() {
    const title = this.$('.panel-title');
    title.removeClass(this.previousClass);
    const deviceStatus = app.statuses.findWhere({
      grp: this.model.get('sgrp'),
      num: this.model.get('stat'),
    });

    if (deviceStatus !== undefined) {
      this.previousClass = deviceStatus.get('dclass');
    } else {
      this.previousClass = 'off';
      console.log(`Get wrong status; Device${this.model.get('id')}; Status:${this.model.get('stat')}; Group:${this.model.get('sgrp')}`);
    }

    this.$('.text-center').html(deviceStatus.get('trans'));
    title.addClass(this.previousClass);
  },
  onDestroy() {
    this.stopListening();
  },
  initialize() {
    this.listenTo(this.model, 'change:stat', this.updateStatus.bind(this));
  },
});

const TableHead = View.extend({
  tagName: 'thead',
  template: table_head,
});

const TableBody = CollectionView.extend({
  tagName: 'tbody',
  childView: BodyRowView,
});

export default View.extend({
  tagName: 'table',
  className: 'table dark-table',
  template: table_template,

  regions: {
    head: {
      el: 'thead',
      replaceElement: true,
    },
    body: {
      el: 'tbody',
      replaceElement: true,
    },

  },

  onRender() {
    this.showChildView('head', new TableHead());
    this.showChildView('body', new TableBody({
      collection: this.values,
    }));
  },
  initialize() {
    this.values = new Backbone.Collection();
    this.collection.each((device) => {
      device.get('faces').each((face) => {
        this.values.add(face);
      });
    });
  },
});
