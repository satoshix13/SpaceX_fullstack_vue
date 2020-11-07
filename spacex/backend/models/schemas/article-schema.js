const mongoose = require('mongoose')


module.exports = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  body: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: { type: String, required: true },
  published:{ type: Number, default: Date.now}
})
