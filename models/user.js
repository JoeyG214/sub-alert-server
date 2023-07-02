const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'A username is required. Enter a username'],
    minlength: [5, 'Username must be at least 5 characters long'],
    unique: [true, 'Username must be unique, this username is already taken'],
  },
  passwordHash: String,
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subscription',
    },
  ],
})

userSchema.plugin(uniqueValidator)
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User