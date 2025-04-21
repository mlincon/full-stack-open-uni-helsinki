// init-mongo.js

// switch to (or create) the `notes` database
db = db.getSiblingDB("notes");

db.createCollection("notes");

// insert our three starter notes
db.notes.insertMany([
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
]);
