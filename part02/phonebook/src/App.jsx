import { useState, useEffect } from "react";
import axios from "axios";

import PersonForm from "./components/PersonForm";
import Persons from "./components/Numbers";
import Filter from "./components/Filter";



const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/persons")
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const peopleToShow = searchText
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(searchText.toLowerCase())
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setSearchText={setSearchText} />

      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>
      <Persons persons={peopleToShow} />
    </div>
  );
};

export default App;
