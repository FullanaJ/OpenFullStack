import REST from "./REST"

const basePath = 'api/blogs'
const getAll = () =>
    REST.getAllObjects(basePath)

const update = (newBlog) =>
    REST.update(basePath, newBlog.id, newBlog)

const create = (newBlog) =>
    REST.create(newBlog, basePath)

const eliminate = (id) =>
    REST.eliminate(id, basePath)


export default { getAll, update, create, eliminate }