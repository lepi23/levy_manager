const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
dotenv.config()
const dbUrl =
  "mongodb+srv://"+process.env.DB_USERNAME+":"+process.env.DB_PASSWORD+"@cluster0.o9ghq.mongodb.net/levytDb?retryWrites=true&w=majority";

const app = express();

/* --------------------------------
 *    APP CONFIG
 * -------------------------------- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'));

/* --------------------------------
 *    ROUTES
 * -------------------------------- */
//mainpage
app.get('/', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('levykauppaData');
    const collection = db.collection('levyt');
    collection
      .find()
      .toArray()
      .then((results) => {
        res.render('index.ejs', { levyt: results });
      })
      .catch((error) => {
        res.redirect('/');
      });
  });
});
//suomilevyt page
app.get('/suomilevyt', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('levykauppaData');
    const collection = db.collection('suomilevyt');
    collection
      .find()
      .toArray()
      .then((results) => {
        res.render('suomilevyt.ejs', { suomilevyt: results });
      })
      .catch((error) => {
        res.redirect('/');
      });
  });
});

app.post('/levyt', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('levykauppaData');
    const collection = db.collection('levyt');
    collection
      .insertOne(req.body)
      .then(() => {
        res.redirect('/');
      })
      .catch(() => {
        res.redirect('/');
      });
  });
});
//post to suomilevyt
app.post('/suomilevyt/levyt', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('levykauppaData');
    const collection = db.collection('suomilevyt');
    collection
      .insertOne(req.body)
      .then(() => {
        res.redirect('/suomilevyt');
      })
      .catch(() => {
        res.redirect('/suomilevyt');
      });
  });
});

app.delete('/levyt', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('levykauppaData');
    const collection = db.collection('levyt');
    collection
      .deleteOne(req.body)
      .then(() => {
        res.json(`Deleted record`);
      })
      .catch(() => {
        res.redirect('/');
      });
  });
});

app.put('/levyt', (req, res) => {
  MongoClient.connect(dbUrl, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    const db = client.db('levykauppaData');
    const collection = db.collection('levyt');
    collection
      .findOneAndUpdate(
        { fname: req.body.oldFname, lname: req.body.oldLname },
        {
          $set: {
            fname: req.body.fname,
            lname: req.body.lname,
          },
        },
        {
          upsert: true,
        }
      )
      .then(() => {
        res.json('Success');
      })
      .catch(() => {
        res.redirect('/');
      });
  });
});

/* --------------------------------
 *    START SERVER
 * -------------------------------- */
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
