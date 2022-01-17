const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// const id = new ObjectId();
// console.log(id.id);
// console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
  if (error) {
    return console.log('Unable to connect to database');
  }
  const db = client.db(databaseName);
  db.collection('tasks')
  // .updateOne({ _id: new ObjectId("61e5d0b2984a61056a433e4e")}, { $inc: { age: -200 } })
  // .then(document => console.log(document))
  // .catch(error => console.log(error));
  .updateMany({ completed: false }, { $set: { completed: true }})
  .then(docs => console.log(docs))
  .catch(error => console.log(error));
});

