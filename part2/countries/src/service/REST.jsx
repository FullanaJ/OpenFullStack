import axios from "axios"


const getAllObjects = (bd,path) =>
  axios.get(createURL(bd,path))


const create = (bd,newObject, path) => {
  const request = axios.post(createURL(bd,path), newObject)
  return request.then(response => response.data)
}

const update = (bd,path, id, newObject) => {
  const request = axios.put(createURL(bd,path, id), newObject)
  return request.then(response => response.data)
}

const eliminate = (bd,id, path) => {
  const request = axios.delete(createURL(bd,path, id))
  return request.then((response) => response.data)
}
const createURL = (bd,...args) => 
   bd.concat(args.join("/"))


export default { getAllObjects, create, update, eliminate }