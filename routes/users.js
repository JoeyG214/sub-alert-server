const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('subscriptions', { name: 1, price: 1, billingPeriod: 1 })

  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  if (!username || username.length < 5) {
    return res.status(400).json({ error: 'Must provided username with atleast 5 characters.' })
  }
  if (!password || password.length < 5) {
    return res.status(400).json({ error: 'Must provide password with atleast 5 characters.' })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({ error: 'username must be unique' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  res.status(201).json(savedUser)
})

module.exports = usersRouter