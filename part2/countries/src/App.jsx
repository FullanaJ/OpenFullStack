import { useState } from 'react'
import BasicForm from './components/BasicForm'
import CountriesRest from './service/CountriesRest'
import Content from './components/Content'

function App() {
  const [countriesNames, setCountriesName] = useState([])
  const [inputForm, setInputForm] = useState('')
  if(countriesNames.length === 0)
    CountriesRest.getAll().then((resp) => resp.data).then((d) => setCountriesName(d.map((x) => x.name.common.toLowerCase())))
  //const findCountries = (text) => setCountriesContent(countriesNames.filter((n) => n.includes(text)))
  const onWrite = (event) => setInputForm(event.target.value)
  
  
  return (
    <>
    <p></p>
      <BasicForm text='find countries' callBackOnWrite={onWrite} />
      <Content onCountrieSelected={setInputForm} countries={countriesNames.filter((c) => c.includes(inputForm.toLowerCase()))}/>
    </>
  )
}

export default App
