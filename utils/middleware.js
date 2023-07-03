const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = (req, _res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (req, _res, next) => {
  const token = req.token

  if (!token) {
    throw new Error('Token Missing')
  }

  const decodedToken = jwt.verify(token, config.SECRET)

  if (!decodedToken.id) {
    throw new Error('Token Invalid')
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    throw new Error('User not found')
  } else {
    req.user = user
  }

  next()
}

const checkSubscriptionFields = (req, _res, next) => {
  const { name, price, billingPeriod } = req.body
  if (!name || !price || !billingPeriod) {
    throw new Error('Subscription information is missing data')
  }
  next()
}

const errorHandler = (error, _req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted ID' })
  } else if (error.name === 'ValidationError') { // Mongoose Schema Validation
    return res.status(400).json({ error: 'Validation Error' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid Token' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token Expired' })
  } else if (error.message === 'invalid username') {
    return res.status(400).json({ error: 'Invalid username' })
  } else if (error.message === 'invalid password') {
    return res.status(400).json({ error: 'Invalid password' })
  } else if (error.message === 'Must provide username with atleast 5 characters') {
    return res.status(400).json({ error: 'Username must be minimum 5 characters' })
  } else if (error.message === 'Must provide password with atleast 5 characters') {
    return res.status(400).json({ error: 'Passoword must be minimum 5 characters' })
  } else if (error.message === 'Username must be unique') {
    return res.status(400).json({ error: 'Username already taken' })
  } else if (error.message === 'Token Missing') {
    return res.status(400).json({ error: 'Could not find token' })
  } else if (error.message === 'Token Invalid') {
    return res.status(400).json({ error: 'Token provided is invalid' })
  } else if (error.message === 'User not found') {
    return res.status(400).json({ error: 'Could not find user' })
  } else if (error.message === 'Subscription information is missing data') {
    return res.status(400).json({ error: 'Fill out all subscription fields' })
  } else if (error.message === 'Subscription not found') {
    return res.status(404).json({ error: 'Subscription not found' })
  } else if (error.message === 'Not authorized to update this subscription') {
    return res.status(403).json({ error: 'You are not authorized to update this subscription' })
  } else if (error.message === 'Not authorized to delete this subscription') {
    return res.status(403).json({ error: 'You are not authorized to delete this subscription' })
  } else {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

module.exports = {
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  checkSubscriptionFields,
  errorHandler,
}