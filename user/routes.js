const express = require('express')
const user = require('./model')

const router = express.Router()
router.route('/')
  .get((req, res) => {
    user.find().then(users => {
      res.send(users)
    })
  })
  .post((req, res) => {
    console.log('data from http post', req.body)
    user.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      dateOfBirth: new Date(req.body.dob).getTime()
    }).then(user => {
      res.send(`user ${user.firstname} created with id: ${user._id}`)
    })
  })

router.route('/:id')
  .get((req, res) => {
    user.findById(req.params.id).then(user => {
      res.send(user)
    })
  })
  .patch((req, res) => {
    //normally here update existing user.......
    res.ok().send('user updated sucessfully.')
  })
  .delete((req, res) => {
    user.findByIdAndDelete(req.params.id).then(() => res.ok())
  })
module.exports = router
