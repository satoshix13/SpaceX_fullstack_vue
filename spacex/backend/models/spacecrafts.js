const mongoose = require('mongoose')
const spacecraftSchema = require('./schemas/spacecraft-schema')


module.exports = mongoose.model('spacecrafts', spacecraftSchema)
