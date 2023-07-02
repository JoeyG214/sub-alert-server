const bcrypt = require('bcrypt')
const User = require('../models/user')

const getUsers = async () => {
  const users = await User
    .find({})
    .populate('subscriptions', { name: 1, price: 1, billingPeriod: 1 })

  return users
}

const createUser = async (username, password) => {
  if (!username || username.length < 5) {
    throw new Error('Must provided username with atleast 5 characters.')
  }
  if (!password || password.length < 5) {
    throw new Error('Must provide password with atleast 5 characters.')
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    throw new Error('username must be unique')
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  return savedUser
}

module.exports = { getUsers, createUser }