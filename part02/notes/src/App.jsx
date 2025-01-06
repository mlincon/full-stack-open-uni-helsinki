import { useState, useEffect } from "react";
import axios from "axios";

import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  const hook = () => {
    console.log("effect");

    const eventHandler = (initialNotes) => {
      setNotes(initialNotes);
    };

    noteService.getAll().then(eventHandler);
  };

  useEffect(hook, []);

  // // alternatively in more compact form:
  // useEffect(() => {
  //   console.log('effect')
  //   noteService
  //     .getAll('http://localhost:3001/notes')
  //     .then(response => {
  //       setNotes(response.data)
  //     })
  // }, [])

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((n) => (n.id === id ? returnedNote : n)));
      })
      .catch((error) => {
        alert(`the note '${note.content}' was already deleted from server`);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: String(notes.length + 1), // json-server generates id automatically
    };

    // recall that concat does not mutate but creates a new copy of an array
    // this is important since we must never mutate state directly in React!
    noteService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const handleNoteChange = (event) => {
    // to enable editing of the input element, we have to register an event
    // handler that synchronizes the changes made to the input with the component's state
    // Also, note that we did not need to call the event.preventDefault() method
    // like we did in the onSubmit event handler. This is because no default
    // action occurs on an input change, unlike a form submission
    setNewNote(event.target.value);
  };

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
