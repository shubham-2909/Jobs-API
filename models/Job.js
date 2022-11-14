const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: [true, 'pls provide company'],
        maxlength: 50
    },
    position: {
        type: String,
        required: [true, 'plss provide position'],
        maxlength: 100
    },
    status: {
        type: String,
        enum: ['interview','declined','pending'],
        default: 'pending'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, 'please provide user']
    }
},{timestamps: true})

module.exports = mongoose.model('Job', jobSchema)