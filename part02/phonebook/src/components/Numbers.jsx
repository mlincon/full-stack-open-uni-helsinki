import crud from "../services/crude";

const Person = ({ person, setPersons }) => {
  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)) {
      crud.remove(id).then((data) => {
        console.log(data)
      });
    }
  };

  return (
    <p>
      {person.name}: {person.number}{" "}
      <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
    </p>
  );
};

const Persons = ({ persons, setPersons }) => {
  return persons.map((person) => (
    <Person key={person.name} person={person} setPersons={setPersons} />
  ));
};

export default Persons;
