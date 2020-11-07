const express = require('express')
const router = express.Router()
const Destinations = require('../models/destinations')


async function listDestinations(req,res) {
  let destinations = await Destinations.find().exec()
  let filteredList = destinations.map((item) => {
    item = {...item.toJSON()}
    return item
  })
  res.send(filteredList)
}


async function createDestination(req,res) {
  try {
    let newDestination = await new Destinations(req.body).save()
    let createdDestination = newDestination.toJSON()
    res.status(201).json(createdDestination)
  } catch (e) {
    console.info(e)
  }
}


async function getDestination(req,res){
  let id = req.params.id
  const destination = await Destinations.findById({_id:id}).exec()
  if(!destination){
    res.status(404).json({message: "Destination not found"})
  }
  res.json(destination)
}

async function deleteDestination(req,res){
  let id = req.params.id

  try {
    let deleted = await Destinations.findOneAndDelete({_id: id})
    res.json({message: "Destination was successfully deleted"})
  } catch (e) {
    console.info(e)
    res.status(404).json({ message: "Destination not found or cant' be deleted"})
  }
}


async function updateDestination(req, res) {
  let destinationId = req.params.id

  let updatedDestination = req.body

  let updatedItem = await Destinations.findOneAndUpdate({ _id: destinationId }, updatedDestination).exec()

  if(updatedItem) {
    res.json(updatedDestination)
  }

  if (!updatedItem) {
    res.status(404).json({ message: "Destination not found" })
  }
}


router.route('/')
      .get(listDestinations)
      .post(createDestination)


router.route('/:id')
      .get(getDestination)
      .put(updateDestination)
      .delete(deleteDestination)

module.exports = router
