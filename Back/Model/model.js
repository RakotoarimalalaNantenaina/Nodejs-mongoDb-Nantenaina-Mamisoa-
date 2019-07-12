const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    _id: { type: Number, required: true },
    nom: String,
    email: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('pers', NoteSchema);