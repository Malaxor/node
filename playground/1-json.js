const fs = require('fs');
const { log } = console;

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday'
// };

// const bookJSON = JSON.stringify(book);
// fs.writeFileSync('1-json.json', bookJSON);

// const data = fs.readFileSync('1-json.json', 'utf-8');
// log(data)

// // returns a buffer
// const dataBuffer = fs.readFileSync('1-json.json');
// log(dataBuffer)

// // convert buffer to string
// const dataString = dataBuffer.toString();
// const parsedData = JSON.parse(dataBuffer)
// log(dataString)
// log(parsedData)



const person = JSON.parse(fs.readFileSync('1-json.json'));
log(person);

// person.name = 'Philip';
// person.age = 38;

// const personJSON = JSON.stringify(person);
// fs.writeFileSync('1-json.json', personJSON);



