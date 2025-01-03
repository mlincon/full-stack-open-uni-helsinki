import { useState } from "react";

const Person = ({ person }) => {
  return <p>{person.name}</p>;
};

const checkDuplicate = (people, name) => {
  return people.find((person) => person.name === name);
};

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const isDuplicate = checkDuplicate(persons, newName);
    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = { name: newName };
    setPersons(persons.concat(personObject));
  };

  const handleAddPerson = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={handleAddPerson} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
      <div>debug: {newName}</div>
    </div>
  );
};

export default App;
