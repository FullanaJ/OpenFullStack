const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('Authorization')
  const token = authorization && authorization.startsWith('Bearer ') ?
    authorization.replace('Bearer ', '') :
    null
  request.token = token
  logger.info("tokenextractor:", request.token)
  next()
}
const userExtractor = async (request, response, next) => {
  logger.info("im in user extractor")
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    request.user = null
  }
  const user = await User.findById(decodedToken.id)
  request.user = user
  logger.info("userExtractor:", request.user)
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error('error: ', error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'BadPassword') {
    return response.status(400).json({ error: 'password must have at least 3 letters' })
  } else if (error.name === 'MongoServerError') {
    if (error.message.indexOf('E11000') != (-1)) {
      return response.status(409).json({ error: 'conflict error duplicate key' })
    }
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  }

  next(error)
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}