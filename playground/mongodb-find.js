//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB Server! :(');
  }
  console.log('Connected to MongoDB Server succesfully! :)');

  // db.collection('Todos').find({
  //   _id: new ObjectID('5a11ca644d488c37624bdb21')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos...', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos: ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos...', err);
  // });

  db.collection('Users').find({
    name: 'Samu'
  }).toArray().then((docs) => {
    console.log('USERS:');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('Unable to fetch users with name \'Samu\'...', err);
  });

  //db.close();
});
