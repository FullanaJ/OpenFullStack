import REST from "./REST"

const basePath = 'persons'
const getAll = () =>
    REST.getAllObjects(basePath)

const update = (newPerson) =>
    REST.update(basePath, newPerson.id, newPerson)

const create = (newPerson) =>
    REST.create(newPerson, basePath)

const eliminate = (id) =>
    REST.eliminate(id, basePath)


export default { getAll, update, create, eliminate }