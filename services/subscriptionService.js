const Subscription = require('../models/subscription')

const getAllSubscriptionsByUser = async (userId) => {
  const subscriptions = await Subscription
    .find({ user: userId })
    .populate('user', { username: 1 })

  return subscriptions
}

const createSubscriptionForUser = async (userId, subscriptionData) => {
  const subscription = new Subscription({
    ...subscriptionData,
    user: userId,
  })

  const savedSubscription = await subscription.save()
  return savedSubscription
}

const updateSubscriptionForUser = async (userId, subscriptionId, subscriptionData) => {
  const subscription = await Subscription.findById(subscriptionId)

  if (!subscription) {
    throw new Error('Subscription not found')
  }

  if (subscription.user.toString() !== userId.toString()) {
    throw new Error('Not authorized to update this subscription')
  }

  const updatedSubscription = await Subscription.findByIdAndUpdate(subscriptionId, subscriptionData, { new: true })
  return updatedSubscription
}

const deleteSubscriptionForUser = async (userId, subscriptionId) => {
  const subscription = await Subscription.findById(subscriptionId)

  if (!subscription) {
    throw new Error('Subscription not found')
  }

  if (subscription.user.toString() !== userId.toString()) {
    throw new Error('Not authorized to delete this subscription')
  }

  await Subscription.findByIdAndDelete(subscriptionId)
}

module.exports = {
  getAllSubscriptionsByUser,
  createSubscriptionForUser,
  updateSubscriptionForUser,
  deleteSubscriptionForUser,
}