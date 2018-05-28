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
            callback(this.info);
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