// const doWorkCallback = (callback) => {
//   setTimeout(() => {
//     // callback('This is my error');
//     callback(undefined, [1, 4, 7])
//   }, 2000);
// }

// doWorkCallback((error, result) => {
//   if (error) {
//     return console.log(error);
//   }
//   console.log(result);
// });

const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('error');
    resolve([1, 4, 7]);
  }, 2000)
});

doWorkPromise
  .then(data => console.log(data))
  .catch(err => console.log(err));