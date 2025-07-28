const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const assert = require('node:assert/strict');
const api = supertest(app)
const { info } = require('../utils/logger')
const { crypt } = require('../utils/hash')

const intialBlogs = [
  {
    title: 'pe pe pe',
    author: 'Pepe',
    url: 'www.de.com',
    likes: 50
  },
  {
    title: 'Techo',
    author: 'Techin',
    url: 'www.techin.com',
    likes: 90
  }
]
const returnUser = async () => {
  const pass = await crypt("123456789")
  return [
    {
      username: 'Pedro',
      password: pass,
      name: 'Jorge',
      blogs: []
    }
  ]
}

let login
let userToken
beforeEach(async () => {
  const initialUsers = await returnUser()

  await Blog.deleteMany({})
  await User.deleteMany({})
  let b = new User(initialUsers[0])
  const user = await b.save()
  intialBlogs[0].user = user._id
  intialBlogs[1].user = user._id
  b = new Blog(intialBlogs[0])
  let result = await b.save()

  user.blogs = user.blogs.concat(result)
  b = new Blog(intialBlogs[0])
  result = await b.save()
  user.blogs = user.blogs.concat(result)
  login = {
    username: user.username,
    password: "123456789"
  }
  await user.save()
  const loginResponse = await api.post('/api/login').send(login)
  userToken = loginResponse.body
})
describe.only('testing app', () => {
  test('check if response is JSON & correct length', async () => {
    const response = await api.get('/api/blogs')
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(response.body.length, intialBlogs.length)
  })

  test('check if unique property is \'id\'', async () => {
    const response = await api.get('/api/blogs')
    const body = response.body
    info("body: ", body)
    assert.ok(body[0].id)
    assert.ok(!body[0]._id)
  })

  test('POST work well', async () => {

    const response = await api.get('/api/blogs')
    const newBlogResponse = await api.post('/api/blogs').set('Authorization', `Bearer ${userToken.token}`).send(intialBlogs[0])
    const createdBlog = newBlogResponse.body
    const responseB = await api.get('/api/blogs')

    // Check count increased
    assert.strictEqual(response.body.length + 1, responseB.body.length)

  })

  test('atribute Likes is 0 by default', async () => {
    const likes = await api.post('/api/blogs').send({
      title: 'Silenc',
      author: 'Tony',
      url: 'www.ttee.com',
    }).set('Authorization', `Bearer ${userToken.token}`)
    assert.deepEqual(likes.body.likes, 0)
  })
  test('if title or url is missing throw 400 bad request', async () => {
    const blog = {
      author: 'Tony',
      url: 'www.ttee.com',
    }
    const blog2 = {
      title: "tttt",
      author: 'Tony',

    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userToken.token}`)
      .send(blog)
      .expect(400)
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${userToken.token}`)
      .send(blog2)
      .expect(400)
  })
  test.only('delete blog by id', async () => {
    const response = await api.post('/api/blogs')
    .set('Authorization', `Bearer ${userToken.token}`)
    .send(intialBlogs[0])
    await api.delete(`/api/blogs/${response.body.id}`)
      .set('Authorization', `Bearer ${userToken.token}`)
      .expect(204)
  })
  test('test update works', async () => {
    const response = await api.get('/api/blogs')
    const b = response.body[0]
    const updatedData = {
      title: b.title,
      author: b.author,
      url: b.url,
      likes: 999999
    }

    const updateResponse = await api.put(`/api/blogs/${b.id}`).send(updatedData)
    assert.ok(updateResponse)
    const bb = await Blog.findById(b.id)
    assert.deepEqual(bb.likes, 999999)

  })
})
describe.only('Users test', () => {
  test('when username is no long enough response 400', async () => {
    await api.post('/api/users').send({
      username: 'Jo',
      password: '123456789',
      name: 'Jorge'
    }).expect(400)
  })
  test('when password is no long enough response 400', async () => {
    await api.post('/api/users').send({
      username: 'Jorge',
      password: '12',
      name: 'Jorge'
    }).expect(400)
  })
  test('when username already exist response 409', async () => {
    const user = await returnUser()
    // info(user)
    await api.post('/api/users')
      .send(user[0])
      .expect(409)
  })
})


after(async () => {
  await mongoose.connection.close()
})