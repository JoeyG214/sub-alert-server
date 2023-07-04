require('express-async-errors')
const subscriptionsRouter = require('express').Router()
const { userExtractor, checkSubscriptionFields } = require('../utils/middleware')
const {
  getAllSubscriptionsByUser,
  createSubscriptionForUser,
  updateSubscriptionForUser,
  deleteSubscriptionForUser,
} = require('../services/subscriptionService')

subscriptionsRouter.get('/', userExtractor, async (req, res) => {
  const user = req.user
  const subscriptions = await getAllSubscriptionsByUser(user.id)
  res.status(200).json(subscriptions)
})

subscriptionsRouter.post('/', userExtractor, checkSubscriptionFields, async (req, res) => {
  const user = req.user
  const { name, price, billingPeriod } = req.body

  const savedSubscription = await createSubscriptionForUser(user.id, { name, price, billingPeriod })
  user.subscriptions = user.subscriptions.concat(savedSubscription.id)
  await user.save()
  res.status(201).json(savedSubscription)
})

subscriptionsRouter.put('/:id', userExtractor, checkSubscriptionFields, async (req, res) => {
  const user = req.user
  const { id } = req.params
  const { name, price, billingPeriod } = req.body

  const updatedSubscription = await updateSubscriptionForUser(user.id, id, { name, price, billingPeriod })
  res.status(200).json(updatedSubscription)
})

subscriptionsRouter.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user
  const { id } = req.params

  await deleteSubscriptionForUser(user.id, id)
  res.status(204).end()
})

module.exports = subscriptionsRouter