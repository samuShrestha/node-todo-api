const { ObjectID } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

// Todo.remove({}).then((res) => {
//   console.log(res);
// });

Todo.findByIdAndRemove('5a2c2f0f5f08f4941cde7d9c').then((res) => {
  console.log(res);
});
