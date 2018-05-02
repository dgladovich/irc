import template from './templates/god_mode.jst';
import {View, Model, CollectionView} from 'backbone.marionette';
import GodModal from './GodModal';


export default View.extend({
    template: template,
    ui: {
        left: '#felt',
        right: '#girht'
    },

    events: {
        'click @ui.left': 'stackLeft',
        'click @ui.right': 'stackRight',
    },
    stackLeft: function () {
        let code = this.model.get('code');
        this.model.set('code', code + '0');
        if (!this.timer) {
            this.timer = setTimeout(this.clearCode.bind(this), 5000)
        } else {
            clearTimeout(this.timer);
            this.timer = setTimeout(this.clearCode.bind(this), 5000)
        }
        this.checkCode();
    },
    stackRight: function () {
        let code = this.model.get('code');
        this.model.set('code', code + '1');
        if (!this.timer) {
            this.timer = setTimeout(this.clearCode.bind(this), 5000)
        } else {
            clearTimeout(this.timer);
            this.timer = setTimeout(this.clearCode.bind(this), 5000)
        }
        this.checkCode();
    },
    clearCode: function () {
        this.model.set('code', '');
    },
    checkCode: function () {
        let inpass;

        switch (this.model.get('code')) {
            case '0010001':
                this.clearCode();
                inpass = prompt('Are you realy want to enter god mode???');
                if (inpass === '2517') {
                    alert('Congragulations!!!! You ve just entered GOD MODE ');
                    this.godModal = new GodModal();
                    $('body').append(this.godModal.render().el);
                    this.godModal.$('#status-uzel1').modal('show');
                }
                break;
            case '000111':
                this.clearCode();
                inpass = prompt('Are you realy want to clear cache???');
                if (inpass === '2517') {
                    app.store.clearAll();
                    alert('Cache cleared')
                }
                break;
            case '111000':
                this.clearCode();
                inpass = prompt('Are you realy want make fullscreen???');
                if (inpass === '2517') {
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullScreen) {
                        document.documentElement.webkitRequestFullScreen();
                    }
                    console.log('fullscreen enabled')
                }
                break;
        }
    },
    onRender: function () {

    },
    initialize: function () {
        this.model = new Backbone.Model({code: ''});
    }
});