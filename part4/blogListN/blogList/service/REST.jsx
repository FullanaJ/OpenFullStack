import axios from "axios"

const bd = '/'

const getAllObjects = (path) =>
  axios.get(createURL(path))

const create = (newObject, path) => {
  const request = axios.post(createURL(path), newObject)
  return request.then(response => response.data)
}
/*
const update = (path, id, newObject) => {
  const request = axios.put(createURL(path, id), newObject)
  return request.then(response => response.data)
}
*/
const eliminate = (id, path) => {
  const request = axios.delete(createURL(path, id))
  return request.then((response) => response.data)
}
const createURL = (...args) =>
  bd.concat(args.join("/"))


export default { getAllObjects, create, eliminate }