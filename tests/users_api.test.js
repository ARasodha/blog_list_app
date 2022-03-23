const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const listHelper = require('../utils/list_helper')

beforeEach(async () => {
  await User.deleteMany({})

  const userObjects = listHelper.users
    .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('check invalid user creation', () => {
  test('username is at least 3 chars long', async () => {
    const newUser = {
      username: 'ab',
      name: 'Antonio Brown',
      password: 'free-agent'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/users')
      const usersAfter = response.body
      expect(usersAfter).toHaveLength(listHelper.users.length)
  })

  test('password is at least 3 chars long', async () => {
    const newUser = {
      username: 'ab12',
      name: 'Antonio Brown',
      password: 'fr'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    const usersAfter = response.body
    expect(usersAfter).toHaveLength(listHelper.users.length)
  })

  test('username is required', async () => {
    const newUser = {
      name: 'Antonio Brown',
      password: 'free-agent'
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    const usersAfter = response.body
    expect(usersAfter).toHaveLength(listHelper.users.length)
  })

  test.only('password is required', async () => {
    const newUser = {
      username: 'ab12',
      name: 'Antonio Brown',
    }

    await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')
    const usersAfter = response.body
    expect(usersAfter).toHaveLength(listHelper.users.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})