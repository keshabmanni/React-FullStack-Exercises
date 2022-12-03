import { useState, useEffect } from 'react'
import axios from "axios";

const App = () => {

  useEffect(()=>{
    axios.get('http://localhost:3002/persons')
    .then(response => {
      setPersons(response.data)
    })
  },[])
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterNameChange = (event) => {
    setFilterName(event.target.value)
  }
  const personsToShow = filterName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const alreadyExists = persons.some(person => person.name === newName)
    if (alreadyExists) {
      window.alert(`${newName} is already added to phonebook`)
    }
    else {
      const nameObject = {
        id: persons.length+1,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
  }
  return (
    <div className="App">
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterNameChange={handleFilterNameChange} />

      <h2>Add a new</h2>
      <PersonForm handleSubmit={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    </div>
  );
}

const Filter = ({filterName, handleFilterNameChange}) => (
  <div>
    filter shown with <input value={filterName} onChange={handleFilterNameChange} />
  </div>
)

const PersonForm = (props) => {
  const newName = props.newName
  const newNumber = props.newNumber
  const handleNameChange = props.handleNameChange
  const handleNumberChange = props.handleNumberChange
  const addPerson = props.handleSubmit
  return(
    <form onSubmit={addPerson}>
        <div>
          <p>name: <input value={newName} onChange={handleNameChange} /> </p>
          <p>number: <input value={newNumber} onChange={handleNumberChange} /> </p>
        </div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons }) => (
  persons.map(person => <p key={person.id}>{person.name} {person.number} </p>)
)

export default App;
