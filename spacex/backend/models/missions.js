const mongoose = require('mongoose')
const missionSchema = require('./schemas/mission-schema')


module.exports = mongoose.model('missions', missionSchema)
