const mongoose = require('mongoose')

module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  depart: { type: Number, required: true },
  return: { type: Number, required: true },
  description: { type: String, required: false },
  creator: {type:mongoose.Schema.Types.ObjectId, ref:'users'},
  state: { type: String, required: false, default: 'pending' },
  passengers: [{
    type:mongoose.Schema.Types.ObjectId, ref:'users'
  }],
  spacecraft: {
    type:mongoose.Schema.Types.ObjectId, ref:'spacecrafts'
  },
  destination: {
    type:mongoose.Schema.Types.ObjectId, ref:'destinations'
  }
})
