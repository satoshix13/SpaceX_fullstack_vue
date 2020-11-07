const express = require('express')
const router = express.Router()
const sha512 = require('js-sha512')
const Users = require('../models/users')
const jwt = require("jsonwebtoken")
const PASSWORD = process.env.TOKEN_PASSWORD



async function login(req,res){
  const credentials = req.body
  const searchParams = {
    email: credentials.email,
    password: sha512(credentials.password)
  }

  const user = await Users.findOne(searchParams).exec()
  if(!user || user.confirmation === false){
    res.status(401).json({message: "User hasn't been found or confirmed yet. Please contact administration"})
    return
  }
  
  const payload = {
    id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    profile: user.profile
  }

  const token = jwt.sign(payload, PASSWORD)
  res.json({token})
}




router.route('/login/')
      .post(login)




module.exports = router
