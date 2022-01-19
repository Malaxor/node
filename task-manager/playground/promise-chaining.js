require('../src/db/mongoose');
const { user: User } = require('../src/models');

// User.findByIdAndUpdate("61e71b73b6f244fc2b035910", { age: 40 })
// .then(user => {
//   console.log(user)
//   return User.countDocuments({ age: 40 });
// })
// .then(count => {
//   console.log(count)
// })
// .catch(err => console.error(err));


const updateAgeAndCount = async (id, age) => {
  const user = await User.findByIdAndUpdate(id, { age });
  const count = await User.countDocuments({ age });
  return { user, count };
}

updateAgeAndCount("61e71b73b6f244fc2b035910", 38)
.then(result => console.log(result))
.catch(err => console.error(err));
