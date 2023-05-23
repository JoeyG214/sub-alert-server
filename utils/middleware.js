const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') { // Mongoose Schema Validation
    return res.status(400).json({ error: 'Validation Error' })
  } else if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'token expired' })
  }
  // else {
  //   return res.status(500).json({ error: 'Something went wrong' })
  // }

  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler,
}