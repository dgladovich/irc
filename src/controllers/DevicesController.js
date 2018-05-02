import Radio from 'backbone.radio';
import io from 'socket.io-client';

const controller = Radio.channel('controller');

export class DevicesController {
    constructor() {
        this.devices = devices;
        this.socket = this.socketInit()
        this.selectValues().then((faces) => {
            this.values = faces;
            this.dispatchValues();
        });
        this.dispatchDevices();
    }

    dispatchValues() {
        this.socket.on('vals', (vals) => {
            vals.shift();
            vals.map((value) => {
                let val = this.values.findWhere({
                    keyn: value.keyn,
                    dev: this.devices.findWhere({id: value.dev}),
                    ctrl: value.ctrl,
                });
                if (val) {
                    val.set({
                        def: +value.val
                    })
                }
            })
        });
        this.socket.emit('allvals', {});
        this.values.each((value) => {
            this.socket.on('c' + value.get('ctrl') + 'd' + value.get('dev').get('id') + value.get('keyn'), (val) => {
                value.set({
                    def: val
                })
            })
        });
        this.socket.on('connect_error', (e) => {
            this.stopDispatchValues();
        })
    }

    dispatchDevices() {
        this.socket.on('stats', (stats) => {
            if (stats[0].stat === 9) {
            }
            stats.map((status) => {
                let device = this.devices.findWhere({
                    id: status.dev
                });
                if (device) {
                    device.set({
                        stat: status.stat,
                        ecode: status.code
                    })
                }
            })
        });
        this.socket.on('connect', () => {
            this.socket.emit('allstats', {});
        })


        this.devices.each((device) => {
            this.socket.on('d' + device.get('id'), (data) => {
                device.set({
                    stat: +data.stat,
                    ecode: +data.code
                })
            });
        });
        this.socket.on('connect_error', (e) => {
            this.stopDispatchDevice();
        })

    }

    stopDispatchDevice() {
        this.devices.each((device) => {
            device.set({
                stat: 9
            })
        })
    }

    stopDispatchValues() {
        this.values.each((value) => {
            value.set({
                def: 0
            })
        })
    }

    selectValues() {
        return Promise.all(this.devices.map((device) => {
            if (device.get('faces').length > 0) {
                return device.get('faces')
            }
        })).then((values) => {
            let vals = new Backbone.Collection();
            values.forEach((faces) => {
                if (faces) {
                    faces.each((face) => {
                        vals.add(face);
                    })
                }
            })
            return vals;
        })

    }

    socketInit(url, token) {
        let socket = io.connect(url, {
            query: 'token=' + token,
            timeout: 2000,
            reconnectionDelay: 2000,
            reconnectionDelayMax: 2000,
            pingTimeout: 3000,
            pingInterval: 3000,
        });
        socket.on("unauthorized", function (error, callback) {
            if (error.data.type == "UnauthorizedError" || error.data.code == "invalid_token") {
                // redirect user to login page perhaps or execute callback:
                callback();
                console.log("User's token has expired");
            }
        });
        socket.on('c' + config.controller, (ctrl) => {
            switch (ctrl.stat) {
                case 9:
                    individual.trigger('individual:activity', {
                        status: false,
                        statusTitle: 'Нет связи с контроллером'
                    });

                    break;
                default:
                    let status = app.statuses.findWhere({
                        grp: 1,
                        num: ctrl.stat
                    })
                    individual.trigger('individual:activity', {
                        status: true,
                        statusTitle: 'Статус контроллера: ' + status.get('trans')
                    });
                    break;
            }
        })
        socket.on('connect_failed', function () {
            individual.trigger('individual:activity', {
                status: false,
                statusTitle: 'Соединение с устройством не удалось'
            });
        })
        socket.on('reconnect_failed', function () {
            individual.trigger('individual:activity', {
                status: false,
                statusTitle: 'Ошибка при повторном соединении с сервером'
            });
        })

        socket.on('error', function (e) {
            individual.trigger('individual:activity', {
                status: false,
                statusTitle: 'Возникла ошибка'
            });

        })
        socket.on('connect_error', (e) => {
            individual.trigger('individual:activity', {
                status: false,
                statusTitle: 'Ошибка при соединении с сервером',
            });
        })
        socket.on('freak', (e) => {
            app.freak = new Backbone.Collection(e);

        });

        socket.on('connect', (sock) => {
            new Noty({
                text: 'Установлено соединение с сервером',
                theme: 'nest',
                type: 'alert',
                layout: 'topCenter',
                killer: true,
                timeout: 3000,
                progressBar: false
            }).show();
            individual.trigger('individual:activity', {
                status: true,
                statusTitle: 'Установлено соединение с сервером'
            });
        });
        socket.on('reconnect_attempt', () => {
            socket.emit('allstats', {});
        });


        status.on('send:status', (e) => {
            socket.emit('_ctrl', e);
        });
        alarm.on('alarm:confirm', (confirm) => {
            console.log('I confirmed alarm: ', confirm);
            socket.emit('_confirm', confirm);
        });


        socket.on('analyze_info', (analyze) => {
            console.log("Analitics is", analyze);
            bot.trigger('analyze:info', analyze);
        });
        bot.on('analyze:request', (analyze) => {
            console.log('I requested analitics: ', analyze);
            socket.emit('analyze', analyze);
        });


        socket.on('confirm', (confirm) => {
            console.log('vasiliy requested me with respornse: ', confirm);
            alarm.trigger('alarm:request', confirm);
        });
        socket.on('alrs', (confirm) => {
            console.log("Alarms update");
            alarm.trigger('alarm:update', confirm);
        });


        window.addEventListener('online', () => {
            socket.emit('allstats', {});
            network.trigger('network:activity', {
                status: true,
                statusTitle: 'Интернет соединение установлено'
            });
        })
        window.addEventListener('offline', () => {
            network.trigger('network:activity', {
                status: false,
                statusTitle: 'Oтсутсвует интернет соединение'
            });
        })
        return socket;
    }

    _bindEvents() {
        /*        this.socket.on('connect', ()=>{
         this.dispatchDevices();
         })*/
    }
}