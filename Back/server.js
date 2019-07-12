const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
var cors = require('cors');
app.use(express.json())
var methodOverride = require('method-override')

app.use(cors());

app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
app.use(methodOverride('_method'));

// var nodemailer = require('nodemailer');
// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'mamisoaj9@gmail.com',
//         pass: 'Mamisoa@26'
//     }
// });

// var mailOptions = {
//     from: 'mamisoaj9@gmail.com',
//     to: 'mamisoaj9@gmail.com',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy! isnt it'
// };

// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// })

const zoho = require('@trifoia/zcrmsdk');

const config = require('./config/zoho.config.js');


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

require('./Routes/route')(app);

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("connexion avec succes");
}).catch(err => {
    console.log('erreur de connexion', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.send('Bienvenue')
});

app.listen(8080, () => {
    console.log("Server demarer");
});