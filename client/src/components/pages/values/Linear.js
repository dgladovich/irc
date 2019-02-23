import { View, Model } from 'backbone.marionette';
import Handlebars from 'handlebars';
export default View.extend({
  onBeforeRender() {
    this.updateLinear(this);
  },
  onDestroy() {
    this.stopListening();
  },
  calculatePercent() {
    const percent = 100 / this.model.get('max_val');


    let linear_val = this.model.get('def') * percent;


    const linear_alert = this.model.get('lim_warning') * percent;


    const linear_danger = this.model.get('lim_danger') * percent;
    linear_val = linear_val > 100 ? 100 : linear_val;
    this.model.set({
      linear_val,
      linear_alert,
      linear_danger,
    });
  },
  countStatus() {
    const def = this.model.get('def');


    const warning = this.model.get('lim_warning');


    const danger = this.model.get('lim_danger');


    if (def >= warning && def < danger) {
      this.previousClass = 'att';
    } else if (def >= danger) {
      this.previousClass = 'danger';
    } else {
      this.previousClass = '';
    }
  },
  updateLinear() {
    const linear = this.$('.item');
    linear.removeClass(this.previousClass);
    this.calculatePercent();
    this.countStatus();
    this.$('.value').css({ width: `${this.model.get('linear_val')}%` });
    this.$('.item-value').html(this.model.get('def'));
    linear.addClass(this.previousClass);
  },
  onRender() {
    this.updateLinear.call(this);
  },
  template: Handlebars.compile(
    `
      <div class="col-xs-12 col-sm-6 col-lg-6">
        <div class="item linear ">
          <div class="item-title">
            <%= name %>,
            <%= translate %>
          </div>
          <div class="item-value">
            <%= def %>
          </div>
          <div class="p-bar">
            <div class="value" style="width:<%= linear_val %>%">
            </div>
            <div class="dev1" style="left:<%= linear_alert %>%"></div>
            <div class="dev2" style="left:<%= linear_danger %>%"></div>
            <div class="min-value">
              <%= min_val %>
            </div>
            <div class="max-value">
              <%= max_val %>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-12 col-sm-6 col-lg-6">
        <div class="values-block">
          <div class="item linear-custom ">
            <div class="item-title">
              <%= name %>,
              <%= measure.get('translate').rus %>
            </div>
            <div class="item-value">0</div>
            <div class="p-bar">
              <div class="value" style="width:<%= linear_val %>%">
              </div>
              <div class="dev1" style="left:<%= linear_alert %>%"></div>
              <div class="dev2" style="left:<%= linear_danger %>%"></div>
              <div class="min-value">
                <%= min_val %>
              </div>
              <div class="max-value">
                <%= max_val %>
              </div>
            </div>
          </div>
        </div>
      </div>`,
  ),
  initialize() {
    this.previousClass = '';
    this.listenTo(this.model, 'change:def', this.updateLinear.bind(this));
  },
});
