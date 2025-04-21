const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true,
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// explicitly tell the driver to authenticate using the default admin database
const url = "mongodb://admin:pass@localhost:27017/notes?authSource=admin";

mongoose.set("strictQuery", false);

mongoose
  .connect(url)
  .then(() => console.log("connected"))
  .catch((e) => console.error("connection error", e.message));

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const app = express();

// json-parser middleware to render request.body properly
app.use(express.json());

app.use(cors());

// whenever Express gets an HTTP GET request it will first check if the dist directory
// contains a file corresponding to the request's address
app.use(express.static("dist"));

app.get("/", (request, response) => {
  // event handler
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (request, response) => {
  Note.find({}).then((notes) => {
    response.json(notes);
  });
});

app.get("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  const note = notes.find((note) => note.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
  return String(maxId + 1);
};

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  };

  notes = notes.concat(notes);

  response.json(note);
});

app.delete("/api/notes/:id", (request, response) => {
  const id = request.params.id;
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
