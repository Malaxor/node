const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
}

// add(1, 2)
// .then(sum => { 
//   console.log(sum);
//   add(sum, 5)
//   .then((sum2) => {
//     console.log(sum2)
//   })
//   .catch(err => console.error(err));
// })
// .catch(err => console.error(err));

add(1, 2)
.then(sum => add(sum, 10))
.then(sum2 => console.log(sum2))
.catch(err => console.error(err));