module.exports = (app) => {
    const notes = require('./../Controlleur/prof.controller');

    
    app.post('/prof', notes.create);

    
    app.get('/prof', notes.findAll);

 
    app.get('/prof/:noteId', notes.findOne);
}