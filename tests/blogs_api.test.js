const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../model/blog')

const listHelper = require('../utils/list_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  
  const userObjects = listHelper.users
  .map(user => new User(user))
  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('blog requests', () => {
  test('test HTTP GET request to /api/blogs', async () => {
    const response = await 
      api.get('/api/blogs')
    expect(response.body).toHaveLength(listHelper.blogs.length)
  })

  test('verify id prop of blogs is named "id"', async () => {
    const response = await 
      api.get('/api/blogs')
      
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

  test.only('verify new blog can be created with POST', async () => {
    const newBlog = {
      title: 'New Blog Added for Test',
      author: 'Cristiano Ronaldo',
      url: 'https://www.cr7.com',
      likes: 7
    }

    await api 
      .post('/api/blogs')
      .set('Authorization', )
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(listHelper.blogs.length + 1)
    expect(titles).toContain('New Blog Added for Test')
  })

  test('verify likes prop default is 0 when missing', async () => {
    const newBlog = {
      title: 'New Blog Added for Test',
      author: 'Cristiano Ronaldo',
      url: 'https://www.cr7.com',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')
    const targetBlog = response.body.find(blog => blog.title === 'New Blog Added for Test')
    expect(targetBlog.likes).toBe(0)
  })

  test('verify missing title and url, results in 400 status code', async () => {
    const newBlog = {
      author: 'Cristiano Ronaldo',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('delete request, valid id', async () => {
    const response = await api.get('/api/blogs')
    const blogsAtStart = response.body
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const response2 = await api.get('/api/blogs')
    const blogsAtEnd = response2.body

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
  })

  test('update blog successfully', async () => {
    const response = await api.get('/api/blogs')
    const blogsAtStart = response.body
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ ...blogToUpdate, likes: 1000 })
      .expect(200)

    const response2 = await api.get('/api/blogs')
    const blogsAtEnd = response2.body
    const updatedBlog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
    expect(updatedBlog.likes).toBe(1000)
  })
})

afterAll(() => {
  mongoose.connection.close()
})