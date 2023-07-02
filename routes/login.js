require('express-async-errors')
const loginRouter = require('express').Router()
const loginService = require('../services/loginService')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const result = await loginService.authenticate(username, password)
  res.status(200).json(result)
})

module.exports = loginRouter