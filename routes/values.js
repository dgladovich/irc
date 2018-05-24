'use strict';
const express = require('express');
const router = express.Router();
const Datastore = require('nedb');
const moment = require('moment');
const _ = require('lodash');


router.get('/', function(req, res, next) {
    const db = new Datastore({filename: 'register', autoload: true});
    const {from, to} = req.query;
    console.log(from, to, req.query);
    if(req.query !== undefined){
        db.find({}, (err, docs)=>{
            if(err){console.error('Some error while reading stuff')}
            const shit = _.filter(docs, (doc)=>{return moment(doc.created_at).isBetween(from, to)});
            res.send(shit)
        })
    }


});


module.exports = router;
