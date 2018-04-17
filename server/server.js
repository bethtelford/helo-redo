require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      ctrl = require('./controller');

const app = express();

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db); 

    app.post('/api/auth/register',  ctrl.register);

    app.post('/api/auth/login', ctrl.login);

    app.listen(4000, _ => console.log('Housten we have lift off on port 4000'));
  })