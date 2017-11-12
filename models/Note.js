// require mongoose
var mongoose = require("mongoose");

// creating Schema class
var Schema = mongoose.Schema;

// creating Note Schema
var NoteSchema = new Schema({
    // needs a string
    body: {
        type: String
    }
});

// creating note model with NoteSchema
var Note = mongoose.model("Note", NoteSchema);

// exporting Note model
module.exports = Note;