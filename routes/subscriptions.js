const subscriptionsRouter = require('express').Router()
const Subscription = require('../models/subscription')
const { userExtractor } = require('../utils/middleware')

subscriptionsRouter.get('/', userExtractor, async (req, res) => {
  const user = req.user

  const subscriptions = await Subscription
    .find({ user: user.id })
    .populate('user', { username: 1 })

  res.status(200).json(subscriptions)
})