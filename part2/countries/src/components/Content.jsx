import CountrieInfo from "./CountrieInfo";

const Content = ({onCountrieSelected, countries }) => {
    const lengh = countries.length
    const buttonHandler = (countrie) => {
        onCountrieSelected(countrie)
    }

    if (lengh > 10)
        return (<p>Too many matches, specify another filter</p>)
    if (lengh > 1)
        return countries.map(
            (c) =>
                <p key={c}> 
                    {c}{' '}
                    <button onClick={() => buttonHandler(c) }>Show</button>
                </p>
        )
    if (lengh === 1)
        return <CountrieInfo name={countries[0]} />
    return
}

export default Content