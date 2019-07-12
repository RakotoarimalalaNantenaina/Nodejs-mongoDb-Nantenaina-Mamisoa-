module.exports = (app) => {
    const notes = require('../Controlleur/controller');
    app.post('/eleve', notes.create);
    app.get('/eleve', notes.findAll);
    app.get('/eleve/:id', notes.findOne);
    // app.get('/zoho', notes.getzoho);
}