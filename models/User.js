const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: { type: String, required: true},
    password: { type: String, required: true }
})

userSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        bcrypt.hash(this.password, 10, (err, hash) => {
            console.log('hi from bcrypt hash', hash)
            if (err) {
                return next(err)
            } 
            this.password = hash
            return next()
        })
    }
})

userSchema.methods.comparePassword = function(pass, cb) {
    bcrypt.compare(pass, this.password, (err, isMatch) => {
        if (err) {
            return cb(err)    
        }
        cb(null, isMatch)
    })
} 

const User = mongoose.model('User', userSchema)

module.exports = User
