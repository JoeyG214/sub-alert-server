require('express-async-errors')
const usersRouter = require('express').Router()
const userService = require('../services/userService')

usersRouter.get('/', async (_req, res) => {
  const users = await userService.getUsers()
  res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
  const { username, password } = req.body
  const savedUser = await userService.createUser(username, password)
  res.status(201).json(savedUser)
})

module.exports = usersRouter