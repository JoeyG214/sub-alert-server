const loginRouter = require('express').Router()
const authService = require('../services/loginService')

loginRouter.post('/', async (request, response) => {
  try {
    const result = await authService.authenticate(request.body)
    response.status(200).send(result)
  } catch (error) {
    response.status(403).json({ error: error.message })
  }
})

module.exports = loginRouter