const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")
const cors= require("cors")
const bearerToken = require("express-bearer-token")


if(process.env.NODE_ENV !== "production") {
  dotenv.config()
}

const port = process.env.PORT || 8000
const app = express()


//*******Controllers********** */

const userRoutes = require('./controllers/users')
const authRoutes = require('./controllers/auth')
const spacecraftRoutes = require('./controllers/spacecrafts')
const articleRoutes = require('./controllers/articles')
const destinationRoutes = require('./controllers/destinations')
const missionRoutes = require('./controllers/missions')

//**********Init Function**********//

function connectDB() {
  try {
    mongoose.connect(process.env.BD, {useNewUrlParser: true, useUnifiedTopology: true}),
    console.log(">> Successfuly connected to DB")
  } catch(e) {
    console.log(e)
  }
}

async function init(){
  await connectDB()
  app.listen(port, () => {
    console.log(`>> Server is open at port ${port}`)
  })
}


//********Middlewares***********//

app.use(express.json())
app.use(cors())
app.use(bearerToken())

//**********Routes***************//

app.get('/', (req,res) => {
  res.send('Successfuly connected to DB 👍')
})

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/spacecrafts', spacecraftRoutes)
app.use('/articles', articleRoutes)
app.use('/destinations', destinationRoutes)
app.use('/missions', missionRoutes)

app.get('*', (req,res) => {
  res.send("Sorry page not found! ❌")
})


init()
