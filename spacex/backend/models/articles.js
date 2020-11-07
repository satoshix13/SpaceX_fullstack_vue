const mongoose = require('mongoose')
const articleSchema = require('./schemas/article-schema')


module.exports = mongoose.model('articles', articleSchema)
