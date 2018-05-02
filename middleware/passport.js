const passport = require('passport');
const { User } = require('../models');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.AUTH_SECRET;

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    return User
        .findOne({where: { id: jwt_payload.id }, attributes: ['id', 'name']} )
        .then((user) => {
            if (user) {
                return done(null, user.toJSON());
            } else {
                return done(null, false);
                // or you could create a new account
            }
        })
        .catch((err) => {
            return done(err, false);
        })
}));

module.exports = passport;