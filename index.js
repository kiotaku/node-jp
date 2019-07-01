'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
  
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
  
db.on('connected', () => {
  if (process.env.NODE_ENV === 'development') {
    require('./localhost')(app, process.env.HTTPS, process.env.PORT)
  } else {
    require('./production')(app, process.env.PORT)
  }
})

app.use('/user', require('./user/routes'))

app.get('/', (req, res) => {
  if (req.secure) {
    res.send('Hello SECURE World from Kioka')
  } else {
    res.send('Hello Unsecure World')
  }
})

app.get('/test', (req, res) => {
  res.send('Testing is fun')
})
