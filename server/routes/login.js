'use strict';
const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const path = require('path');
const {User, UserGroup} = db;
const SECRET = process.env.AUTH_SECRET;
router
    .get('/', (req, res) => {
        if (req.session.token ) {
            res.redirect('/')
        } else {
            res.sendFile(path.resolve('public', 'auth_design.html'));
        }
    })
    .get('/logout', (req, res)=>{
        req.session.destroy();
        res.redirect('/login');
    })
    .get('/credentionals', (req, res)=>{
        let token = req.session.token;
        let name = req.session.name;
        if(token){

            res.json({
                auth: true,
                token: token,
                name: name
            });
        } else {
            res.json({
                auth: false
            })
        }
    })
    .post('/', function (req, res, next) {

        User
            .findOne({
                where: {id: req.body.name},
                include: [
                    {
                        model: UserGroup,
                        as: 'group'
                    }
                ]
            })
            .then((user) => {
                if (!user) {
                    return res.status(404).send('No user found.');
                }
                let passwordIsValid = md5(req.body.password) === user.get('pass');
                if (!passwordIsValid) {
                    return res.status(401).send({auth: false, token: null});
                }
                let name = user.get('name');

                let token = jwt.sign(
                    {
                        id: user.get('id')
                    },
                    SECRET,
                    {
                        expiresIn: 86400 // expires in 24 hours
                    }
                );
                let usr = {
                    id: user.get('id'),
                    name: name,
                    group: user.get('group'),
                };

                req.session.token = token;
                req.session.name = name;

                res.status(200).send({auth: true, token: token, user: usr});
            })
            .catch((err) => {
                return res.status(500).send(`Error on the server. <br> ${err}`);
            });
    })
    .get('/users', (req, res, next) => {
        User.findAll({attributes: ['id', 'name']})
            .then((users) => {
                res.json(users);
            })
            .catch((err) => {
                res.status(500).send(err);
            })
    })
    .get('/verify', (req, res, next) => {
        console.log('Someone tryed to verify token')
    });
module.exports = router;
