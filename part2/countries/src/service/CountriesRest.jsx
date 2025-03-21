import REST from "./REST"

const bd = 'https://studies.cs.helsinki.fi/restcountries/api/'
const getAll = () => REST.getAllObjects(bd,'all')
const getCountrieByName = (name) => 
    REST.getAllObjects(bd,`name/${name}`)

export default {getAll, getCountrieByName}