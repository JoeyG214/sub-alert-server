require('express-async-errors')
const usersRouter = require('express').Router()
const User = require('../models/user')
const userService = require('../services/userService')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('subscriptions', { name: 1, price: 1, billingPeriod: 1 })

  res.json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const savedUser = await userService.createUser(username, password)
  res.status(201).json(savedUser)
})

module.exports = usersRouter