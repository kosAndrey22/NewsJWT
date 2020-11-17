const mongoose = require("mongoose");
const noteScheme = new mongoose.Schema({
    title: String,
    author: String,
    text: String,
    createdAt: Number
}, { versionKey: false });
const Note = mongoose.model("Note", noteScheme);
module.exports = Note;