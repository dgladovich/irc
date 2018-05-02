'use strict';
const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { User, UserGroup } = db;

router
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

                let token = jwt.sign(
                    {
                        id: user.get('id')
                    },
                    process.env.AUTH_SECRET,
                    {
                        expiresIn: 86400 // expires in 24 hours
                    }
                );
                let usr = {
                    id: user.get('id'),
                    name: user.get('name'),
                    group: user.get('group'),
                }
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
module.exports = router;
