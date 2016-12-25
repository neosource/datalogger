const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
var db;

const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.post('/data',(req, res) => {
  db.collection('datalog').save(req.body, (err, result) => {
    if (err) return console.log(err);
    console.log('saved to database');
  });
});

MongoClient.connect('mongodb://datalog:d1a2t3a4@ds145118.mlab.com:45118/datalogger', (err, database) => {
  if(err) return console.log(err);
  db = database;
  app.listen(port, () => {
    console.log(`Server is up on port ${port}` );
  });
});
