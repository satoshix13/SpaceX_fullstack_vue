const mongoose = require('mongoose')


module.exports = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  distance: { type: Number, required: false },
  _length: { type: Number, required: false },
  description: { type: String, required: false },
  state: { type: String, required: false, default: 'active' }
})
