import REST from "./REST"

const api_key = import.meta.env.VITE_SOME_KEY
const bd = 'https://api.openweathermap.org/data/2.5/weather'
const getWeatherByLatAndLon = (lat, lon) => {
    const options = `?lat=${lat}&lon=${lon}&appid=${api_key}`
    return REST.getAllObjects(bd, options)
}
export default { getWeatherByLatAndLon }