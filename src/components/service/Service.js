import template from './templates/service.jst';
import { View, Model } from 'backbone.marionette';
import moment from 'moment';
import accounting from 'accounting';
import WorksCollection from './WorksCollection';
import ServiceMaterials from './ServiceMaterials';
import Radio from 'backbone.radio';
import aja from 'aja';

const works = Radio.channel('works');
const serviceChannel = Radio.channel('servicechannel');

export default View.extend({
    template: template,
    events: {
        'click .make-service': 'makeService'
    },
    regions: {
        works: {
            el: '#wrks'
        },
        timeleft: {
            el: 'span#time-left'
        },
        materials: {
            el: '#materials'
        },
        total: {
            el: '#total'
        }
    },
    makeService: function() {
        this.model.set({
            _pre: this.device.get('moto'),
            performed: this.works.where({ perform: 1 })
        });
        this.$('.make-service').attr('disabled', true);
        return aja()
            .method('put')
            .url('/to')
            .body(this.model.toJSON())
            .on('200', (response) => {
                this.model.set(response);
                this.updateTime();
                this.$('.make-service').attr('disabled', false);
                serviceChannel.trigger('service:done');
            })
            .on('40x', function(response) {
                console.log('service is not updated')
                this.$('.make-service').attr('disabled', false);
            })
            .on('500', function(response) {
                console.log('some another shit')
                this.$('.make-service').attr('disabled', false);
            })
            .go();
    },
    onBeforeRender: function() {
        this.device = app.devices.findWhere({ id: this.model.get('dev') });
    },
    updateTime: function() {
        let moto = this.device.get('moto');
        let previuos = this.model.get('_pre');
        let limit = this.model.get('_lim');
        let left = limit - (moto - previuos);
        let leftText = '';

        left <= 0 ? leftText = 'ТО просрочено на: ' : leftText = 'Осталось до ТО: ';

        switch (this.model.get('ser_num')) {
            case 1:
            case 2:
                left = Math.abs(left) + 'ч.';
                break;
            case 3:
            case 4:
            case 5:
                left = Math.abs(moment().add(left, 'hours').diff(moment(), 'months')) + 'мес.';
                break;
                /*            case 5:
                                left = Math.abs(moment().add(left, 'hours').diff(moment(), 'years')) + 'г.';
                                break;*/
            default:
                console.log('result is undefined')
        }
        this.$('#time-left').html(leftText + left);
        return this;
    },
    updateTotalPrice: function() {
        let price = 0;
        this.materials.each((material) => {
            price += material.get('price') /** material.get('count')*/ ;
        });
        this.$('#total .total-value').html(accounting.toFixed(price, 2) + ` грн`);
    },
    onRender: function() {
        this.showChildView('works', new WorksCollection({
            collection: this.works
        }));
        this.showChildView('materials', new ServiceMaterials({
            collection: this.materials
        }));
        this.updateTotalPrice();
        this.updateTime();
/*        if (this.model.get('ser_num') !== 1) {
            this.showChildView('works', new WorksCollection({
                collection: this.works
            }));
            this.showChildView('materials', new ServiceMaterials({
                collection: this.materials
            }));
            this.updateTotalPrice();
            this.updateTime();
        } else {
            this.$('.make-service').remove();
            this.$('#' + this.model.get('id') + ' .panel-body').html('ТО1 не является необходимым для smart системы');
        }
*/

    },
    initialize: function() {
        this.works = new Backbone.Collection();
        this.model.get('service_work').map((work) => {
            this.works.add(Object.assign({ devc: this.model.get('dev') }, work))
        });
        this.performed = new Backbone.Collection();
        this.model.set('performed', this.performed);
        this.materials = new Backbone.Collection();
        this.performed.on('change', () => {});
        works.on('works:add:' + this.model.get('id'), (work) => {
            this.model.get('performed').add(work);
        });
        works.on('works:remove:' + this.model.get('id'), (work) => {
            this.model.get('performed').remove(work);
        });
        _.each(this.model.get('serviceWorks'), (serviceWork) => {
            _.each(serviceWork.works.materials, (material) => {

                let mat = material.mat,
                    packingCost = mat.price,
                    packSize = mat.cnt,
                    matSize = material.cnt,
                    matPrice = (packingCost * matSize) / packSize,
                    //matPrice = packingCost / packSize * matSize,
                    suchMat = this.materials.findWhere({ id: mat.id }),
                    currency = 'грн',
                    matMeasure;

                switch (mat.meas) {
                    case 16:
                        matMeasure = 'г';
                        break;
                    case 15:
                        matMeasure = "шт.";
                        break;
                    default:
                        matMeasure = '';
                }
                if (!suchMat) {
                    this.materials.add({
                        id: mat.id,
                        count: matSize,
                        name: mat.name,
                        price: matPrice,
                        measurment: matMeasure,
                        currency: currency
                    })
                } else {
                    let oldPrice = suchMat.get('price'),
                        oldCount = suchMat.get('count');
                    suchMat.set({
                        price: oldPrice + matPrice,
                        count: oldCount + matSize
                    })
                }
            });
        });
    }
});