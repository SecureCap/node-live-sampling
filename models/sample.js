const { Schema } = require('mongoose')

const sampleSchema = new Schema({
    url: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Sample = mongoose.model('Sample', sampleSchema)

module.exports = Sample