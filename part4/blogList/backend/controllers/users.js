const userRouter = require('express').Router()
const User = require('../models/user')
const { crypt } = require('../utils/hash')
const { badPassword } = require('../utils/errors')
const { info } = require('../utils/logger')

userRouter.get('/', async (request, response) => {
    const result = await User.find({}).populate('blogs', { user: 0 })
    response.send(result)
})

userRouter.get('/:id', async (request, response) => {
    const result = await User.findById(request.params.id)
    result ? response.json(result) : response.status(404).end()
})

userRouter.post('/', async (request, response) => {
    const passw = request.body.password
    info(passw)
    if (passw.length < 3)
        throw badPassword()
    else {
        const newPass = await crypt(passw)
        const user = new User({ ...request.body, password: newPass })
        const result = await user.save()
        response.status(201).json(result)
    }
})

userRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = userRouter 
