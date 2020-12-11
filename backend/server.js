//https://www.freecodecamp.org/news/building-a-simple-node-js-api-in-under-30-minutes-a07ea9e390d2/

const express = require('express');
const mongoClient = require("mongodb").MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: true}));

mongoClient.connect(db.url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, database) => {
    if (err) {
        return console.log(err);
    }

    const db = database.db("rsvp-me")

    require('./app/routes')(app, db);
})

app.listen(port, () => console.log(`Running on port ${port}`));