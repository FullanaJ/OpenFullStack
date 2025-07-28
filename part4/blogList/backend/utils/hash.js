const bcrypt = require('bcrypt')
const { info } = require('./logger')

const crypt = async (data) => {
    const salt = 10
    const result = await bcrypt.hash(data,salt)
    return result
}

module.exports = {crypt}