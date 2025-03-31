import { useState, useEffect } from 'react'
import Content from './components/Content'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonREST from './service/PersonREST'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotificationMsg] = useState(null)

  const AddNewPerson = (event) => {
    event.preventDefault()
    checkIfNewNameExist() ?
      askToUpdate() :
      createNewPerson()
  }

  const askToUpdate = () => {
    window.confirm(`${newName} is already added to phonebook,
       replace the old number with a new one?`) ?
      updateNumber() : console.log('canceled')
  }

  const updateNumber = () => {
    const person = persons.find((p) => p.name === newName)
    const personUpdate = { ...person, number: newNumber }
    PersonREST.update(personUpdate).then(() => {
      setPersons(persons.map((p) => p.name !== newName ? p : personUpdate))
      makeNotification(`Update ${newName}`, false)
    }
    ).catch()
  }

  const createNewPerson = () => {
    const p = {
      name: newName,
      number: newNumber
    }
    PersonREST.create(p)
      .then((resp) => {
        setPersons(persons.concat(resp))
        makeNotification(`Added ${resp.name}`, false)
      }).catch(
        makeNotification(`${newName} already exist on server`, true)
      )
  }
  const makeNotification = (text, error) => {
    setNotificationMsg(
      {
        text,
        error
      }
    )
    setTimeout(() => {
      setNotificationMsg(null)
    }, 5000);
  }

  const handleNewNamechange = (event) => setNewName(event.target.value)

  const handleNewNumberchange = (event) => setNewNumber(event.target.value)

  const handleFilterChange = (event) => setFilter(event.target.value)

  const checkIfNewNameExist = () => persons.map((p) => p.name).includes(newName)

  // const nameExistAlert = (name) => alert(`${name} is already added to phonebook`)

  const onDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      const x = persons.filter((p) => p.id !== id)
      PersonREST.eliminate(id).then((resp) => console.log('Delete Response: ', resp))
        .catch(makeNotification(`Information of ${name} has already been removed from server`, true))
      setPersons(x)
    }
  }

  const filterPersonByName = () => {
    if (filter != '') {
      const personsFiltered = persons
      return personsFiltered.filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
    }
    return persons
  }

  useEffect(() => { PersonREST.getAll().then((res) => setPersons(res.data)) }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter filter={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm onNameChange={handleNewNamechange} onNumberChange={handleNewNumberchange} onSubmit={AddNewPerson} />
      <h3>Numbers</h3>
      <Content persons={filterPersonByName()} onDelete={onDelete} />
    </div>
  )
}

export default App