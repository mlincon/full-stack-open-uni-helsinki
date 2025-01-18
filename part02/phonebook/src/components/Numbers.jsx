import crud from "../services/crude";

const Person = ({ person, deleteFunc }) => {

  return (
    <p>
      {person.name}: {person.number}{" "}
      <button onClick={() => deleteFunc(person.id, person.name)}>
        delete
      </button>
    </p>
  );
};

const Numbers = ({ persons, deleteFunc }) => {

  return persons.map((person) => (
    <Person
      key={person.name}
      person={person}
      deleteFunc={deleteFunc}
    />
  ));
};

export default Numbers;
