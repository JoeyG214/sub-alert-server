const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../utils/config')

const authenticate = async ({ username, password }) => {
  const user = await User.findOne({ username })

  let passwordCorrect = false
  if (user !== null) {
    passwordCorrect = await bcrypt.compare(password, user.passwordHash)
  }

  if (!(user && passwordCorrect)) {
    throw new Error(user ? 'invalid password' : 'invalid username')
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  // Token expires in 60 minutes
  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 })

  return { token, username: user.username, name: user.name }
}

module.exports = { authenticate }