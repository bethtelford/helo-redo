require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      session = require('express-session'),
      ctrl = require('./controller');

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db);

    app.post('/api/auth/register', ctrl.register);

    app.post('/api/auth/login', ctrl.login);

    app.get('/api/auth/me', ctrl.userProfile);

    app.post('/api/auth/logout', ctrl.logout);

    app.get('/api/posts', ctrl.readPosts);

    app.post('/api/post', ctrl.createPost);
    
    app.get('/api/post/:id', ctrl.readPost);

    app.listen(4000, _ => console.log('Housten we have lift off on port 4000'));
  })