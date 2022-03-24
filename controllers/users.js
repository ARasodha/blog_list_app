const bcrypt = require('bcrypt')
const User = require('../models/user')
const usersRouter = require('express').Router()

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')

  response.json(users)
})


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    console.log('error: username must be unique')
    
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  if (!password || password.length < 3) {
    console.log('error: password must be at least 3 characters long');
    
    return response.status(400).json({
      error: 'password must be at least 3 characters long'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter