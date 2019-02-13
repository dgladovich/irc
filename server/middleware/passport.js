const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { User } = require('../db');

const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.AUTH_SECRET;


passport.use(new JwtStrategy(opts, ((jwt_payload, done) => User
        .findOne({ where: { id: jwt_payload.id }, attributes: ['id', 'name'] })
        .then((user) => {
            if (user) {
                return done(null, user.toJSON());
            }
                return done(null, false);
                // or you could create a new account
        })
        .catch(err => done(err, false)))));

module.exports = passport;
