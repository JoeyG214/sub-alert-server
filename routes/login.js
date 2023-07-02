require('express-async-errors')
const loginRouter = require('express').Router()
const authService = require('../services/loginService')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const result = await authService.authenticate(username, password)
  res.status(200).send(result)
})

module.exports = loginRouter