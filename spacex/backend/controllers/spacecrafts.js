const express = require('express')
const router = express.Router()
const Spacecrafts = require('../models/spacecrafts')


async function listSpacecrafts(req,res) {
  let spacecrafts = await Spacecrafts.find().exec()
  let filteredList = spacecrafts.map((item) => {
    item = {...item.toJSON()}
    return item
  })
  res.send(filteredList)
}


async function createSpacecraft(req,res) {
  try {
    let newSpacecraft = await new Spacecrafts(req.body).save()
    let createdSpacecraft = newSpacecraft.toJSON()
    res.status(201).json(createdSpacecraft)
  } catch (e) {
    console.info(e)
  }
}


async function getSpacecraft(req,res){
  let id = req.params.id
  const spacecraft = await Spacecrafts.findById({_id:id}).exec()
  if(!spacecraft){
    res.status(404).json({message: "Spacecraft not found"})
  }
  res.json(spacecraft)
}

async function deleteSpacecraft(req,res){
  let id = req.params.id

  try {
    let deleted = await Spacecrafts.findOneAndDelete({_id: id})
    res.json({message: "Spacecraft was successfully deleted"})
  } catch (e) {
    console.info(e)
    res.status(404).json({ message: "Spacecraft not found or cant' be deleted"})
  }
}


async function updateSpacecraft(req, res) {
  let spacecraftId = req.params.id

  let updatedSpacecraft = req.body

  let updatedItem = await Spacecrafts.findOneAndUpdate({ _id: spacecraftId }, updatedSpacecraft).exec()

  if(updatedItem) {
    res.json(updatedSpacecraft)
  }

  if (!updatedItem) {
    res.status(404).json({ message: "Spacecraft not found" })
  }
}


router.route('/')
      .get(listSpacecrafts)
      .post(createSpacecraft)


router.route('/:id')
      .get(getSpacecraft)
      .put(updateSpacecraft)
      .delete(deleteSpacecraft)

module.exports = router
