require('express-async-errors')
const loginRouter = require('express').Router()
const authService = require('../services/loginService')

loginRouter.post('/', async (req, res) => {
  const result = await authService.authenticate(req.body)
  res.status(200).send(result)
})

module.exports = loginRouter