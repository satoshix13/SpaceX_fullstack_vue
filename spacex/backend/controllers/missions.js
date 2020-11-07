const express = require('express')
const router = express.Router()
const Missions = require('../models/missions')
const userAndAdminAllowed = require('../middlewares/userAndAdminAllowed')
const onlyAdminAllowed = require('../middlewares/onlyadminallowed')

async function listMissions(req,res) {
  let missions = await Missions.find().populate('creator').populate('spacecraft').populate('passengers').populate("destination").exec()
  let filteredList = missions.map((item) => {
    item = {...item.toJSON()}
    return item
  })
  // res.send(filteredList)
  res.json(missions)
}


async function createMission(req,res) {
  try {
    newMissionData = {
        name: req.body.name,
        depart: req.body.depart,
        return: req.body.return,
        description: req.body.description,
        creator: req.user.id,
        state: req.body.state,
        passengers: [req.user.id],
        spacecraft: req.body.spacecraft,
        destination: req.body.destination,
    }
    let newMission = await new Missions(newMissionData).save()
    let createdMission = newMission.populate('creator','passengers', 'spacecraft', 'destination')
    res.status(201).json(createdMission)
  } catch (e) {
    console.info(e)
  }
}


async function getMission(req,res){
  let id = req.params.id
  const mission = await Missions.findById({_id:id}).populate('creator').populate('spacecraft').populate('destination').populate('passengers').exec()
  if(!mission){
    res.status(404).json({message: "Mission not found"})
  }
  res.json(mission)
}


async function deleteMission(req,res){
  const id = req.params.id
  try {
    let deleted = await Missions.findOneAndDelete({_id: id})
    res.json({message: "Mission was successfully deleted"})
  } catch (e) {
    console.info(e)
    res.status(404).json({ message: "Mission not found or cant' be deleted"})
  }
}


async function updateMission(req, res) {
  let missionId = req.params.id
  let item = await Missions.findById(missionId).exec()

  if(!item){
    res.status(404).json({message: "mission not found"})
  }

  if(req.body.message === "addPassenger"){
    let updatedItem = item.toJSON()
    updatedItem.passengers.push(req.user.id)
    try{
      await Missions.findOneAndUpdate({ _id: missionId }, updatedItem, {new:true}).populate('creator').populate('spacecraft').populate('passengers').populate('destination').exec()
      res.json(updatedItem)
    }catch(e){
      res.status(500).json({message: "something went wrong"})
    }
  }

  if(req.body.message === "removePassenger"){
    let updatedItem = item.toJSON()
    let index = updatedItem.passengers.findIndex(item => item === req.user.id)
    updatedItem.passengers.splice(index,1)
    try{
      await Missions.findOneAndUpdate({ _id: missionId }, updatedItem, {new:true}).populate('creator').populate('spacecraft').populate('passengers').populate('destination').exec()
      res.json(updatedItem)
    }catch(e){
      res.status(500).json({message: "something went wrong"})
    }
  }

  
  let updatedMission= req.body

  let updatedItem = await Missions.findOneAndUpdate({ _id: missionId }, updatedMission).exec()

  if(updatedItem) {
    res.json(updatedMission)
  }

  if (!updatedItem) {
    res.status(404).json({ message: "Mission not found" })
  }
  // }
}

router.route('/')
      .get(listMissions)
      .post(userAndAdminAllowed,createMission)


router.route('/:id')
      .get(getMission)
      .put(userAndAdminAllowed,updateMission)
      .delete(deleteMission)

module.exports = router
