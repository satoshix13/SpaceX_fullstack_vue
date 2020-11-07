const mongoose = require('mongoose')
const destinationSchema = require('./schemas/destination-schema')


module.exports = mongoose.model('destinations', destinationSchema)
