require('dotenv').config();
const express = require('express'),
  bodyParser = require('body-parser'),
  massive = require('massive')
axios = require('axios');

const app = express();

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.post('/api/auth/register', (req, res) => {
      console.log();
      let { username, password } = req.body;
      db.read_user(username, password)
        .then(user => {
          if (user[0]) {
            res.status(200).send(user[0])
          } else {
            db.create_user(username, password, `https://robohash.org/${username}.png`)
              .then(user => res.status(200).send(user[0]))
          }
        })
    })

    app.post('/api/auth/login', (req, res) => {
      let { username, password } = req.body;
      db.read_user(username, password)
        .then(user => {
          user[0] ? res.status(200).send(user[0]) : res.status(404).send();
        })
    })

    app.listen(4000, _ => console.log('Housten we have lift off on port 4000'))
  })