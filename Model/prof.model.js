const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    _id: Number,
    nom: String,
    prenom: String,
    matiere: { matiere1: String, matiere2: String},
    classeoccupe: { classe1: Number, classe2: Number},
}, {
    timestamps: true,
});


module.exports = mongoose.model('prof', NoteSchema);