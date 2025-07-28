const badPassword = () => {
    error = new Error('BadPassword');
    error.name = 'BadPassword'
    error.status = 400;
    return error
}

module.exports = { badPassword }