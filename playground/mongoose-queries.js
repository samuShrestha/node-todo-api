const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

User.findById('5a11f2313d26ab3c089c9f92').then((user) => {
  if(!user) {
    return console.log('ERROR: USER NOT FOUND');
  }
  console.log(JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));

// var id = '5a17d9c43f95e4485593266d1';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID NOT VALID FAM!!');
// }
//
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo: ', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('ID NOT FOUND!!');
//   }
//   console.log('Todo By Id: ', todo);
// }).catch((err) => console.log(err));
