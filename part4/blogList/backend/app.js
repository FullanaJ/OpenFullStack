const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const config = require('./utils/config')
const { info, error } = require('./utils/logger')
const middleware = require('./utils/middleware')
const Morgan = require('morgan')
const mongoose = require('mongoose')
const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    info('connected to MongoDB')
  })
  .catch( e => {
    error('error connecting to MongoDB:', e.message)
  })
app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(Morgan('tiny'))
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter )
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app