const express = require('express')
const router = express.Router()
const Users = require('../models/users')
const sha512 = require('js-sha512')
const onlyAdminMiddleware = require('../middlewares/onlyadminallowed')




async function listUsers(req,res) {
  let users = await Users.find().exec()
  let filteredList = users.map((item) => {
    item = {...item.toJSON()}
    delete item.password
    return item
  })
  res.send(filteredList)
}



async function createUser(req,res) {
  req.body.password = sha512(req.body.password)

  try {
    let newUser = await new Users(req.body).save()
    let createdUser = newUser.toJSON()
    delete createdUser.password
    res.status(201).json(createdUser)
  } catch (e) {
    console.info(e)
  }
}


async function getUser(req,res){
  let id = req.params.id
  const user = await Users.findById(id).exec()
  delete user.password
  if(!user){
    res.status(404).json({message: "user not found"})
  }
  res.json(user)
}

async function deleteUser(req,res){
  let id = req.params.id

  try {
    let deleted = await Users.findOneAndDelete({_id: id})
    res.json({message: "User was successfully deleted"})
  } catch (e) {
    console.info(e)
    res.status(404).json({ message: "user not found or cant' be deleted"})
  }
}


async function updateUser(req,res){
  let id = req.params.id
  let updateFields = req.body
  let foundUser =  await Users.findOneAndUpdate({_id:id}, updateFields,{new:true}).exec()

  if(!foundUser) {
    res.status(404).json({ message: "user not found"})
  }

  if(foundUser) {
    let updatedUser = foundUser.toJSON()
    delete updatedUser.password
    res.json(updatedUser)
  }
}


router.route('/')
      .get(onlyAdminMiddleware,listUsers)
      .post(createUser)



router.route('/:id')
      .get(getUser)
      .delete(deleteUser)
      .put(updateUser)


module.exports = router
