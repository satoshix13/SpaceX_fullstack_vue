const mongoose = require('mongoose')


module.exports = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  phone: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  weight: { type: Number, required: false },
  height: { type: Number, required: false },
  age: { type: Number, required: false },
  profile: { type: String, required: false, default: 'user' },
  confirmation: { type: Boolean, default: false },
})
