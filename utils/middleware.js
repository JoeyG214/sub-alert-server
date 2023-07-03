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
  } else {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
}