const Prof = require('../Model/prof.model.js');

exports.create = (req, res) => {

    if(!req.body.nom) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });  
    }
    
    var id;

    Prof.find()
        .then(profe => {

            if(profe==0){
                id=0
            }else{
                id = parseInt(profe[profe.length - 1].id) + 1
            }

            const prof = new Prof({
                _id: id,
                nom: req.body.nom || "Untitled Note", 
                prenom: req.body.prenom,
                matiere: {matiere1: req.body.matiere1, matiere2: req.body.matiere2},
                classeoccupe: {classe1: req.body.classe1, classe2: req.body.classe2},
                
            });
            prof.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Note."
                });
            });
        })
};


exports.findAll = (req, res) => {
    Prof.find()
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findOne = (req, res) => {

    Prof.findById(req.params.noteId)
    .then(prof => {
        if(!prof) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(prof);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving prof with id " + req.params.noteId
        });
    });
};
