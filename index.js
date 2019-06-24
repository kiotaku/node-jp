'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const db = require('./db')

const { Schema } = mongoose

mongoose.Promise = Promise
const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  dateOfBirth: Date
})

const user = mongoose.model('User', userSchema)

db.on('connected', () => app.listen(process.env.PORT))

app.get('/user', (req, res) => {
  user.find().then(users => {
    res.send(users)
  })
})

app.post('/user', (req, res) => {
  console.log('data from http post', req.body)
  user.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    dateOfBirth: new Date(req.body.dob).getTime()
  }).then(user => {
    res.send(`user ${user.firstname} created with id: ${user._id}`)
  })
})

app.get('/', (req, res) => {
  res.send('Hello World from Kioka')
})

app.get('/test', (req, res) => {
  res.send('Testing is fun')
})
