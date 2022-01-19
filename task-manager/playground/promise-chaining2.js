require('../src/db/mongoose');
const { task: Task } = require('../src/models');

// Task.findByIdAndRemove("61e71fd3a40e7af6d51b27a4")
// .then(task => {
//   return Task.countDocuments({ completed: false });
// })
// .then(count => console.log(count))
// .catch(err => console.log(err));

const deletedAndCount = async (id) => {
  await Task.findByIdAndRemove(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
}

deletedAndCount("61e86423414b8041b713f310")
.then(count => console.log(count))
.catch(err => console.log(err));