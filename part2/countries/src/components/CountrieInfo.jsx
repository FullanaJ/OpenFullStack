import CountriesRest from "../service/CountriesRest"
import { useState } from 'react'
import WeatherRest from "../service/WeatherRest"

const CountrieInfo = ({ name }) => {
    const [countrie, setCountrie] = useState(null)
    const [weather, setWeather] = useState(null)
    console.log(countrie);
    if (countrie === null) {
        CountriesRest.getCountrieByName(name).then(
            (resp) => setCountrie(resp.data)
        )
        return
    }
    if (weather === null)
    WeatherRest.getWeatherByLatAndLon(countrie.capitalInfo.latlng[0], countrie.capitalInfo.latlng[1])
        .then((resp) =>{
            setWeather(resp.data)
            console.log(resp.data)
        } )
            
    else
        return (
            <>
                <h1>{countrie.name.common}</h1>
                <p>Capital {countrie.capital[0]}</p>
                <p>Area {countrie.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(countrie.languages).map((l) => <li key={l}>
                        {l}
                    </li>)}
                </ul>
                <img src={countrie.flags.png} />
                <h2>Weather in {countrie.capital[0]}</h2>
                <p> Temperature {parseFloat(weather.main.temp-273).toFixed(2)} Celsius </p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <p>Wind {weather.wind.speed} m/s</p>
            </>
        )
}

export default CountrieInfo