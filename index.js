'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))

db.on('connected', () => app.listen(process.env.PORT))

app.use('/user', require('./user/routes'))

app.get('/', (req, res) => {
  res.send('Hello World from Kioka')
})

app.get('/test', (req, res) => {
  res.send('Testing is fun')
})
