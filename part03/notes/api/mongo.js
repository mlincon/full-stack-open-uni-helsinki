const mongoose = require("mongoose");

// if (process.argv.length < 3) {
//   console.log("give password as argument");
//   process.exit(1);
// }

// const password = process.argv[2];

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

const note = new Note({
  content: "HTML is easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note);
  });
  mongoose.connection.close();
});
