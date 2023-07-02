const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('subscriptions', { name: 1, price: 1, billingPeriod: 1 })

  res.json(users)
})

module.exports = usersRouter