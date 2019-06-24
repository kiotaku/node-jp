const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  dateOfBirth: Date
})

module.exports = mongoose.model('User', userSchema)
