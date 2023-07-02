const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

loginRouter.post('/', async (req, res) => {
  const { username, password } = req.body

  const user = await User.findOne({ username })

  let passwordCorrect = false
  if (user !== null) {
    try {
      passwordCorrect = await bcrypt.compare(password, user.passwordHash)
    } catch (e) {
      return res.status(500).json({ error: 'Could not verify password' })
    }
  }

  if (!(user && passwordCorrect)) {
    return res.status(403).json({
      error: user ? 'Invalid password' : 'Invalid username',
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // Token expires in 60 minutes
  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 })

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter