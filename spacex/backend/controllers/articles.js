const express = require('express')
const router = express.Router()
const Articles = require('../models/articles')
const slugify = require('slugify')



async function listArticles(req,res) {
  let articles = await Articles.find().exec()
  if(!articles){
    res.status(404).json({message: "sorry, cant get articles now"})
  }
  res.send(articles)
}


async function createArticle(req,res){
  let article = req.body
  article.slug = slugify(article.title)
  article.excerpt = article.body.substring(0,50)+"...."


   try {
     let newArticle = await new Articles(article).save()
     res.status(201).json(newArticle)
   } catch (e) {
     res.status(400).json({message: e})
   }
}


async function getArticle(req,res){
  let id = req.params.id
  let foundItem = await Articles.findById(id).exec()
  if(!foundItem){
    res.status(404).json({message:"article not found"})
  }
  res.status(201).json(foundItem)
}


async function deleteArticle(req,res){
  let id = req.params.id

  try {
    let deleted = await Articles.findOneAndDelete({_id: id})
    res.json({message: "Article was successfully deleted"})
  } catch (e) {
    console.info(e)
    res.status(404).json({ message: "Articles not found or cant' be deleted"})
  }
}

async function updateArticle(req, res) {
  let articleId = req.params.id

  let updatedArticle= req.body

  let updatedItem = await Articles.findOneAndUpdate({ _id: articleId }, updatedArticle).exec()

  if(updatedItem) {
    res.json(updatedArticle)
  }

  if (!updatedItem) {
    res.status(404).json({ message: "Article not found" })
  }
}


router.route('/')
      .get(listArticles)
      .post(createArticle)



router.route('/:id')
      .get(getArticle)
      .delete(deleteArticle)
      .put(updateArticle)


module.exports = router
