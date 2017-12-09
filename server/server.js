const {mongoose}    =  require('./db/mongoose');
const {Todo}        = require('./models/todo');
const {User}        = require('./models/user');
const { ObjectID }  = require('mongodb');
const _             = require('lodash');

const express       = require('express');
const app             = express();
const bodyParser    = require('body-parser');

// ---- MIDDLEWARE ----
app.use(bodyParser.json());

// ---- PORT ----
const port = process.env.PORT || 3000;

// ---- ROUTES FOR API ----
//=========================

// CREATE
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

// READ - ALL
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

// READ - SINGLE
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  //Validate ID using isValid
  if (!ObjectID.isValid(id)) {
    //Respond with a 404
    res.status(404).send();
  }
  //findById
  Todo.findById(id).then((todo) => {
    //SUCCESS - if todo, send | None? No todo found, 404! Empty body.
    if(!todo) {
      res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => res.status(400).send()); //ERROR - 404 | Empty Body

});

// UPDATE
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => res.status(400).send);
});

// DELETE
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => res.status(400).send());
});

app.listen(port, () => {
  console.log(`Started up on port: ${port}`);
});

module.exports = {app};
