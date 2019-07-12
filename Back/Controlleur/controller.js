const Eleve = require('../Model/model.js');
exports.create = (req, res) => {

    if (!req.body.nom) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    var id;
    Eleve.find()
        .then(test => {
            if (test.length == 0) {
                id = 0;
            } else {
                id = parseInt(test[test.length - 1].id) + 1
            }

            const eleve = new Eleve({
                _id: id,
                nom: req.body.nom || "Untitled Eleve",
                email: req.body.email,
            });

            eleve.save()
                .then(data => {
                    res.send(data);
                    console.log(data);

                }).catch(err => {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Note."
                    });
                });
        })
};


// exports.getzoho = (req, res, next) => {

//     const { page = 0, per_page = 200 } = req.query;

//     zoho.initialize(config).then((client) => {
//         client.API.MODULES.get({
//             module: 'All_courses', // Module name
//             params: {
//                 page,
//                 per_page,
//             },
//         }).then((response) => {
//             res.json(JSON.parse(response.body));
//         }).catch(next);
//     }).catch(next);
// };


exports.findAll = (req, res) => {
    Eleve.find()
        .then(notes => {
            res.send(notes);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
};

exports.findOne = (req, res) => {

    Eleve.findById(req.params.id)
        .then(eleve => {
            Prof.find()
                // .then(prof => {
                //     var tab = []
                //     tab.push(eleve)
                //     for (let i = 0; i < prof.length; i++) {
                //         if (prof[i].classeoccupe.classe1 == eleve.classe || prof[i].classeoccupe.classe2 == eleve.classe) {
                //             tab.push(prof[i])
                //         }
                //     }
                //     res.send(tab)
                // })
            if (!eleve) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error retrieving eleve with id " + req.params.id
            });
        });
};