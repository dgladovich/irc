let _ = require('underscore');
let sqlite3 = require('sqlite3').verbose();

module.exports = {
    db: null,
    last: 0,
    texts: [],
    info: {},
    init: function(dbfile='', days=1, callback) {
        if(dbfile.length > 0 || days <= 0) {
            this.db = new sqlite3.Database(dbfile);
            this.dbdo(`SELECT * FROM smart_informer WHERE active = 1`, (err, texts) => {
                this.texts = texts;
                this.recalculate(days, (info) => {
                    callback(info);
                });
            });
        } else {
            let errmsg = 'File name is empty or days == 0';
            console.error(errmsg);
            callback(errmsg, {});
        }
    },
    future_service: function(callback) {
        //leftHours = lim - (moto - pre)

        let res = {
            need_service: 0,
            need_hours: 0,
            future_service: 0,
            future_hours: 0
        };
        let hours = {};
        let moto = this.get_motohours();

        this.dbdo(`SELECT * FROM smart_devs WHERE body_id != 'null'`, (err, devs) => {
            if(!err && devs.length > 0 && devs[0]) {
                this.dbdo(`SELECT * FROM smart_dev_servs WHERE dev = ${devs[0].id}`, (er, sers) => {
                    if(!er) {
                        _.each(sers, (ser) => {
                            hours[(ser.ser_num || 0)] = (ser._lim || 0) - (moto - (ser._pre || 0));
                        });
                        _.each(hours, (hour, ser_n) => {
                            if(hour <= 0) {
                                res.need_service = ser_n;
                                res.need_hours = hour * -1;
                            }
                            if (res.future_hours === 0) {
                                res.future_service = parseInt(ser_n);
                                res.future_hours = hour;
                            } else {
                                if (hour < res.future_hours) {
                                    res.future_service = ser_n;
                                    res.future_hours = hour;
                                }
                            }
                        });
                        callback(res);
                    } else {
                        callback("SERVICES NOT FOUND");
                    }
                });
            } else {
                callback("Device not found");
            }
        });

    },
    get_motohours: function() {
        return process.env.motohours || 0;
    },
    recalculate: function(days=0, callback) {
        let rnd = this.randomize();
        this.dbdo(`SELECT * from smart_alrs WHERE strftime('%Y-%m-%d', date) > date('now', '-${days} days') ORDER BY date ASC`, (err, alrs) => {
            this.info = {
                text: (_.has(this.texts, rnd)) ? this.texts[rnd].text : '',
                crashes: 0,
                hours: {
                    idle: 0,
                    work: 0,
                    eidle: 0
                },
                nodes: []
            };
            if(alrs.length > 0) {
                let cur = null;
                let crash_delay = 0;
                if (alrs.length > 0) {
                    _.each(alrs, (alr) => {

                        // Count crashes
                        if (alr.stat === 2) {
                            this.info.crashes += 1;
                            if (!crash_delay) {
                                crash_delay = alr.date;
                            }
                        }
                        if (!cur) {
                            cur = Object.assign({}, alr);
                        } else {
                            // New status?
                            if (cur.stat !== alr.stat) {
                                // Count hours
                                this.info.hours[(cur.stat === 1) ? 'work' : 'idle'] += this.count_hours(alr.date, cur.date);

                                // Count error delay status
                                if (alr.stat === 0 || alr.stat === 1) {
                                    if (crash_delay) {
                                        this.info.hours.eidle = this.count_hours(alr.date, crash_delay);
                                        crash_delay = null;
                                    }
                                }

                                this.info.nodes.push({start: cur.date, end: alr.date, stat: cur.stat, dev: cur.dev, code: cur.code});
                                cur = null;
                            }
                        }
                    });
                }
            }
            this.future_service((ser) => {
                this.info.next_service = ser;
                callback(this.info);
            });
        });
    },
    get_info: function() {
        return this.info;
    },
    count_hours: function(d1, d2) {
        let c = Math.abs(new Date(d1) - new Date(d2));
        return parseInt((c/(1000*60*60))%24);
    },
    randomize: function() {
        let r = Math.floor(Math.random() * 10);
        return this.last = ((r === this.last) ? this.randomize() : r);
    },
    dbdo: function(req=null, callback) {
        if(this.db && !_.isNull(req) && req.length > 0) {
            this.db.all(req, function (err, rows) {
                callback(err, rows);
            });
        }
    }
};