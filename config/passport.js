const passport = require('passport')
const jwt = require('jsonwebtoken')

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt') 

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
    }
))

module.exports = passport