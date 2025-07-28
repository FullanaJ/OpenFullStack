const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { password: 0, blogs: 0 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user
  
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  const result = await Blog.findById(request.params.id)
  if (result.user.toString() === user.id.toString()) {
    result.deleteOne()
    return response.status(204).send(result).end()
  } else {
    return response.status(403).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const b = await Blog.findById(request.params.id)
  if (!b)
    return response.status(404).end()

  b.title = request.body.title
  b.author = request.body.author
  b.url = request.body.url
  b.likes = request.body.likes
  const r = await b.save()
  response.json(r)
})


module.exports = blogsRouter