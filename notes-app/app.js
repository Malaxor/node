const chalk = require('chalk');
const getNotes = require('./notes');
const { log } = console;

const command = process.argv[2];

if (command === 'add') {
  log('Adding note!');
} else if (command === 'remove') {
  log('Removing note!');
}