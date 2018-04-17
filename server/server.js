require('dotenv').config();
const express = require('express'),
      bodyParser = require('body-parser'),
      massive = require('massive'),
      session = require('express-session'),
      ctrl = require('./controller')
      port = process.env.PORT || 4000
      path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname+'/../parts'));

// app.use((req, res, next) => {
//   console.log('url', req.url, 'method', req.method);
//   next();
// })
massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db);

    // Parts 1 & 2
    app.post('/api/v1/auth/register',  ctrl.v1.register);
    app.post('/api/v1/auth/login', ctrl.v1.login);
    app.get('/api/v1/posts/:userid', ctrl.v1.readPosts);
    app.post('/api/v1/post/:userid', ctrl.v1.createPost);

    // Part 3
    app.post('/api/v2/auth/register',  ctrl.v2.register);
    app.post('/api/v2/auth/login', ctrl.v2.login);
    app.post('/api/v2/auth/logout', ctrl.v2.logout);
    app.get('/api/v2/auth/me', ctrl.v2.userProfile);
    app.get('/api/v2/posts', ctrl.v2.readPosts);
    app.post('/api/v2/post', ctrl.v2.createPost);

    // Universal
    app.get('/api/post/:id', ctrl.readPost);

    app.get('*', (req, res)=>{
      if (req.url.includes('part1'))
        return res.sendFile(path.join(__dirname, '../parts/part1/index.html'))
      if (req.url.includes('part2'))
        return res.sendFile(path.join(__dirname, '../parts/part2/index.html'))
        return res.sendFile(path.join(__dirname, '../parts/part3/index.html'))


    })

    app.listen(port, _ => console.log('Housten we have lift off on port '+ port ));
  })
