// setTimeout(() => {
//   console.log('two seconds are up.')
// }, 2000);

// const names = ['Andrew', 'Jen', 'Jess'];
// const shortNames = names.filter(name => name.length <= 4);
// console.log(shortNames)

// const geocode = (address, callback) => {
//   setTimeout(() => {
//     const data = {
//       lat: 0,
//       long: 0
//     };
//     callback(data);
//   }, 2000);
// }

// geocode('Detroit', (data) => {
//   console.log(data);
// });

const add = (a, b, callback) => {
  setTimeout(() => {
    callback(a + b);
  }, 2000);
}

add(1, 4, (sum) => {
  console.log(sum);
})