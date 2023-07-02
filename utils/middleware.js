const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'Malformatted ID' })
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
  } else {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}