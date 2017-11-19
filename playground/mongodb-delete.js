//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to the MongoDB Server! :(');
  }
  console.log('Connected to MongoDB Server succesfully! :)');

  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat some damn fud'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat some damn fud'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  //CHALLENGE
  db.collection('Users').deleteMany({name: 'Samu'}).then((result) => {
    console.log(result);
  });
  db.collection('Users').findOneAndDelete({_id: new ObjectID('5a11cbf50b5f00379cff386a')}).then((result) => {
    console.log(`DELETE: You just deleted ${result.value.name}`);
  });

  //db.close();
});
