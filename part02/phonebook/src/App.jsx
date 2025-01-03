import { useState } from "react";

const Person = ({ person }) => {
  return (
    <p>
      {person.name}: {person.number}
    </p>
  );
};

const checkDuplicate = (people, name) => {
  return people.find((person) => person.name === name);
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const isDuplicate = checkDuplicate(persons, newName);
    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = { name: newName, number: newNumber };
    setPersons(persons.concat(personObject));
  };

  const handleAddName = (event) => {
    setNewName(event.target.value);
  };

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handlePersonSearch = (event) => {
    setSearchText(event.target.value);
  };

  const peopleToShow = searchText
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handlePersonSearch} />
      </div>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleAddName} />
        </div>
        <div>
          number: <input onChange={handleAddNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {peopleToShow.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default App;
