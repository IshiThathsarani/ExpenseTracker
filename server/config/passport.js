const pkg = require('passport-jwt');
const JwtStrategy = pkg.Strategy;
const ExtractJwt = pkg.ExtractJwt;

const User = require('../models/user');


let opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret.';

function passport(passport) {
     passport.use(
        new JwtStrategy(opts, function(jwt_payload, done) {
            User.findOne({_id: jwt_payload._id})
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => {
                return done(err, false);
            });
        
    }));
}

module.exports = passport;
