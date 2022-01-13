const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LibrarySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  books: [ // array here allows us to hold multiple references to books
    // if the square bracket wasn't here, it would be a singular reference to a single book
    {
      type: Schema.Types.ObjectId, // refers to the _id object type
      ref: "Book" // refers to the collection called Book in Book.js
    }
  ]
});

const Library = mongoose.model("Library", LibrarySchema);

module.exports = Library;
