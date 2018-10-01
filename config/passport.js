const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const User = require('../models/User')

const passportOpts = {
    // Set Extraction method to pull it out from our header
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'secretkey'
}

// Set passport to use JWT Strategy
passport.use(new JwtStrategy(
    passportOpts,
    (jwt_payload, done) => {
        console.log(jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false)
            }
            console.log("user", user)
            if (user) {
                done(null, user)
            } else {
                done(null, false)
            }
        })
    }
))

module.exports = passport