import { useState } from "react";
import crud from "../services/crude";

const checkDuplicate = (people, name) => {
  return people.find((person) => person.name === name);
};

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const isDuplicate = checkDuplicate(persons, newName);
    if (isDuplicate) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const personObject = { name: newName, number: newNumber };
    crud.create(personObject).then((data) => {
      setPersons(persons.concat(data));
    });
  };

  const handleAddName = (event) => {
    setNewName(event.target.value);
  };

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
  };

  return (
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
  );
};

export default PersonForm;
