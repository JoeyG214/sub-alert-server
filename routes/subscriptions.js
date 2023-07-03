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

subscriptionsRouter.post('/', userExtractor, async (req, res) => {
  const token = req.token
  const user = req.user
  const { name, price, billingPeriod } = req.body

  if (!user || !token) {
    throw new Error('Token is missing or invalid')
  }

  if (!name || !price || !billingPeriod) {
    throw new Error('Subscription information is missing data')
  }

  const subscription = new Subscription({
    name,
    price,
    billingPeriod,
    user: user.id,
  })

  const savedSubscription = await subscription.save()
  user.subscriptions = user.subscriptions.concat(savedSubscription.id)
  await user.save()

  res.status(201).json(savedSubscription)
})

subscriptionsRouter.delete('/:id', userExtractor, async (req, res) => {
  const token = req.token
  const user = req.user
  const { id } = req.params

  if (!user || !token) {
    throw new Error('Token is missing or invalid')
  }

  await Subscription.findByIdAndDelete(id)
  res.status(204).end()
})