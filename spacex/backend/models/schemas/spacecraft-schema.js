const mongoose = require('mongoose')


module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  max_load: { type: Number, required: false },
  height: { type: Number, required: false },
  diameter: { type: Number, required: false },
  passengers: { type: Number, required: false },
  description: { type: String, required: false },
  mood: { type: String, required: false, default: 'active' },
  state: { type: String, required: false, default: 'free' }
})
