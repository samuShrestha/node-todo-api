const express = require('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

// POST TODO
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

// GET ALL TODOS
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) => {
    res.status(400).send(err);
  });
});

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
  }).catch((e) => res.status(404).send()); //ERROR - 404 | Emtpy Body

});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};
